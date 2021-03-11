import {gql} from "apollo-server-express";

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
    
    type StatusText {
        value: String
    }
    
    type EncodedPolyLine {
        points: String!
    }
    
    type LatLng {
        lat: String!
        lng: String!
    }
    
    type Address {
        LatLng: LatLng
        postcode: String!
        firstLine: String!
    }
    
    type Route {
        EncodedPolyLine: EncodedPolyLine
        addresses: [Address!]!   
    }
    
    type Query {
        allUsers: [Username!]!
        currentLoggedInUser: User
        allProperties: StatusText
        searchFilterGetDirections(list: String!, postcode: String!, radius: String!, results: String!): Route
    }

    type Mutation {
        addUser(
            username: String!
            password: String!
        ): Boolean
        login(
            username: String!
            password: String!
        ): Token
    }
`;