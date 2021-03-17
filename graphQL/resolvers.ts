import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
    AddressData,
    IUser,
    NonConfidentialUser, Property,
    PropertyData,
    Route,
    SearchFilterGetDirectionsProps,
    Token
} from '../utils/types-and-interfaces';
import User, { IMongooseUser } from '../models/user';
import { AxiosResponse } from 'axios';
import { DocumentQuery } from 'mongoose';
import { SECRET_JWT } from '../index';
import { UserInputError } from 'apollo-server-express';
import { asyncFilter } from '../utils/async-filter';
import { filterByEPC } from '../business-logic/business-logic';
import getDirectionsResponse from '../directions-service/directions-service';
import { getSourcedProperties } from '../properties-service/properties-service';

export const resolvers = {
    Mutation: {
        addUser: async (_root: unknown, args: IUser): Promise<boolean> => {
            const saltRounds = 10;
            const passwordHash: string = await bcrypt.hash(args.password, saltRounds);

            const newUser = new User({ ...args, passwordHash: passwordHash });

            try {
                await newUser.save();
                return true;
            } catch (e) {
                throw new UserInputError(
                    'Something went wrong saving your account to our database. ' +
                    'Username probably already exists, try a different username.');
            }
        },
        login: async (_root: unknown, args: IUser): Promise<Token> => {
            const user: IMongooseUser | null = await User.findOne({ username: args.username });
            const passwordCorrect: boolean = user === null ?
                false :
                await bcrypt.compare(args.password, user.passwordHash);

            if (!user || !passwordCorrect) {
                throw new UserInputError('Wrong credentials. Please try again.');
            }

            const userForToken = {
                id: user._id,
                username: user.username
            };

            return { value: jwt.sign(userForToken, SECRET_JWT) };
        }
    },

    Query: {
        allUsers: async (): Promise<DocumentQuery<NonConfidentialUser[], never>> => {
            return User.find({});
        },
        searchFilterGetDirections: async (
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
            _root: any,
            {
                list,
                postcode,
                radius,
                results
            }: SearchFilterGetDirectionsProps,
        ): Promise<Route> => {

            // Axios typing is hard

            // Get the list of properties for the given parameters
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const propertiesResponse: AxiosResponse<PropertyData> = await getSourcedProperties(
                list, postcode, radius, results
            );
            const properties = propertiesResponse.data.properties;

            // Fail fast.
            if (properties.length === 0) {
                throw new UserInputError('No properties found for given search terms');
            }

            // Parse the first line of the address and the postcode and use that to find the EPC certificate for each
            // property. If there is no cert or the rating is [E, F, G] then the property is of interest.
            const propertiesOfInterest = await asyncFilter(properties, async (property: Property) => {
                const firstLineAddress = property.address.split(',')[0];
                const postcode = property.postcode;
                return await filterByEPC(firstLineAddress, postcode);
            });


            // Fail fast. Google maps has a 25 limit on waypoints.
            if (propertiesOfInterest.length > 20) {
                throw new UserInputError('Too many properties, reduce range of parameters.');
            }
            if (propertiesOfInterest.length <= 0) {
                throw new UserInputError(
                    'No properties left after business logic filtering, increase range of parameters'
                );
            }

            // Keep a tab on the properties of interest that will be returned to make a marker on the google map.
            const addresses = propertiesOfInterest.map(({ lat, lng, address, postcode }: AddressData) => {
                return {
                    LatLng: {
                        lat: lat,
                        lng: lng,
                    },
                    firstLine: address,
                    postcode: postcode
                };
            });

            // Get the optimised route only for the properties of interest.
            const directionsResponse = await getDirectionsResponse(
                propertiesOfInterest.map((object: AddressData) => `${object.address} ${object.postcode}`));

            return {
                EncodedPolyLine: directionsResponse.data.routes[0].overview_polyline,
                addresses: addresses
            };
        }
    }
};