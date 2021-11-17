import RootQuery from "./query";
import RootMutation from "./mutation";

import * as User from "./entity/User";

export const typeDefs = [
  RootQuery,
  RootMutation,
  User.typeDefs,
]

export const resolvers = [
  User.resolvers,
]
