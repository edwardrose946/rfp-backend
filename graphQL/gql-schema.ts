import { makeExecutableSchema } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const gqlSchema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs: typeDefs,
});

