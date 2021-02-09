import {gql} from "apollo-server";

export const ALL_USERS = gql`
    query ALL_USERS{
        allUsers{
            username
        }
    }`;