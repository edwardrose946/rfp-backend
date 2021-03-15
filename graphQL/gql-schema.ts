import {makeExecutableSchema} from "apollo-server-express";
import {resolvers} from "./resolvers";
import {typeDefs} from "./typeDefs";

export const gqlSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

