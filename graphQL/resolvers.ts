import User from "../models/user";
import * as bcrypt from "bcrypt";
import {UserInputError} from "apollo-server";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = 'ChickenDippers';

interface IUser {
    username: string
    password: string
}

interface IToken {
    value: string
}

export const resolvers = {
    Query: {
        allUsers: async () => {
            return User.find({});
        }
    },

    Mutation: {
        addUser: async (_root: unknown, args: IUser): Promise<IUser> => {

            const saltRounds = 10;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            const passwordHash: string = await bcrypt.hash(args.password, saltRounds);

            const newUser = new User({...args, passwordHash: passwordHash});

            try {
                await newUser.save();
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                throw new UserInputError(e.message, {
                    invalidArgs: args
                });
            }
            return args;
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