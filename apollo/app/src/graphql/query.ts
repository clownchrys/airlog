import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        users: [ User! ]!
        user(id: ID!): User!
    }
`;

export default typeDefs;
