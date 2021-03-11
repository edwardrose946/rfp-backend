import User from "../models/user";
import * as bcrypt from "bcrypt";
import {UserInputError} from "apollo-server-express";
import * as jwt from "jsonwebtoken";
import getDirectionsResponse from "../directions-service/directions-service";
import {getSourcedProperties, getSourcedPropertiesWrapper} from "../properties-service/properties-service";
import {filterByEPC} from "../business-logic/business-logic";

const JWT_SECRET = 'ChickenDippers';

interface IUser {
    username: string
    password: string
}

interface IToken {
    value: string
}

interface EncodedPolyLine {
    points: string
}

interface ISearchFilterGetDirectionsProps {
    list: string
    postcode: string
    radius: string
    results: string
}

interface ILatLng {
    lat: string
    lng: string
}

interface IAddress {
    LatLng: ILatLng
    postcode: string
    firstLine: string
}

interface IRoute {
    EncodedPolyLine: EncodedPolyLine
    addresses: [IAddress]
}

interface IPropertyProperties {
    address: string
    postcode: string
    lat: string
    lng: string
}
export const resolvers = {
    Query: {
        allUsers: async () => {
            return User.find({});
        },
        allProperties: async () => {
            try {
                const res = await getSourcedPropertiesWrapper();
                console.log(res);
                return {value: res.statusText};
            } catch (e) {
                console.log(e);
                return e;
            }
        },
        searchFilterGetDirections: async (_root: any, {
            list,
            postcode,
            radius,
            results
        }: ISearchFilterGetDirectionsProps): Promise<IRoute> => {
            const propertiesResponse: any = await getSourcedProperties(list, postcode, radius, results);
            const properties = propertiesResponse.data.properties;

            //refactor into helper method file
            const asyncFilter = async (arr: any, predicate: any) => {
                const results = await Promise.all(
                    properties.map(
                        predicate
                    )
                );
                return arr.filter((_v: any, index: any) => results[index]);
            };
            const propertiesOfInterest = await asyncFilter(properties, async (property: any) => {
                const firstLineAddress = property.address.split(',')[0];
                const postcode = property.postcode;
                return await filterByEPC(firstLineAddress, postcode);
            });

            console.log(propertiesOfInterest);
            const addresses = propertiesOfInterest.map(({lat, lng, address, postcode}: IPropertyProperties) => {
                return {
                    LatLng: {
                        lat: lat,
                        lng: lng,
                    },
                    firstLine: address,
                    postcode: postcode
                };
            });

            const directionsResponse = await getDirectionsResponse(propertiesOfInterest.map((object: any) => `${object.address} ${object.postcode}`));
            return {
                EncodedPolyLine: directionsResponse.data.routes[0].overview_polyline,
                addresses: addresses
            };
        }
    },

    Mutation: {
        addUser: async (_root: unknown, args: IUser): Promise<boolean> => {

            const saltRounds = 10;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            const passwordHash: string = await bcrypt.hash(args.password, saltRounds);

            const newUser = new User({...args, passwordHash: passwordHash});

            try {
                await newUser.save();
                return true;
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                throw new UserInputError(e.message, {
                    invalidArgs: args
                });
            }
        },
        login: async (_root: unknown, args: IUser): Promise<IToken> => {
            const user = await User.findOne({username: args.username});
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const passwordCorrect: boolean = user === null ?
                false :
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                await bcrypt.compare(args.password, user.passwordHash);

            if (!user || !passwordCorrect) {
                throw new UserInputError('wrong credentials');
            }

            const userForToken = {
                username: user.username,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: user._id
            };

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            return {value: jwt.sign(userForToken, JWT_SECRET)};
        }
    }
};