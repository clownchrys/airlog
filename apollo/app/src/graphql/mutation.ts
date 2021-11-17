import { gql } from "apollo-server";

const typeDefs = gql`
  type Mutation {
      addUser(name: String!): User
  }
`;

export default typeDefs;