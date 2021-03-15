import {ApolloServer} from "apollo-server-express";
import {gqlSchema} from "./graphQL/gql-schema";

export const apolloServer = new ApolloServer({
    schema: gqlSchema,
});