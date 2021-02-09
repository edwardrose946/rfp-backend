import {gql} from "apollo-server";

export const typeDefs = gql`
    type Username {
        username: String!
    }
    
    type User {
        username: Username!
        password: String!
    }

    type Token {
        value: String!
    }

    type Query {
        allUsers: [Username!]!
        currentLoggedInUser: User
    }

    type Mutation {
        addUser(
            username: String!
            password: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`;