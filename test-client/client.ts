import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

const cache = new InMemoryCache();
const link = new HttpLink({
    fetch,
    uri: 'http://localhost:4000/graphql'
});

export const graphQLClient = new ApolloClient({
    cache,
    link
});