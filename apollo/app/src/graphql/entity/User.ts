import { gql } from "apollo-server";
import { } from "apollo-server-express";

const testUser = {
    id: -1,
    name: "TEST"
};

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }
`;

export const resolvers = {
    Query: {
        users: () => {
            return [ testUser ];
        },
        user: (parent: any, args: any, context: any, info: any) => {
            if ( args.id === undefined ) throw new Error("id is necessary");
            return testUser;
        }
    },

    Mutation: {
        addUser: () => {
            return testUser;
        }
    }
};