import { gql } from 'apollo-server-express';

export const ALL_USERS = gql`
    query ALL_USERS{
        allUsers{
            username
        }
    }`;