import {ApolloServer} from "apollo-server";
import {gqlSchema} from "./graphQL/gql-schema";

export const apolloServer = new ApolloServer({schema: gqlSchema});