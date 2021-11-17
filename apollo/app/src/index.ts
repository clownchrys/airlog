import { ApolloServer } from "apollo-server";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginCacheControl
} from "apollo-server-core";
import { InMemoryLRUCache } from "apollo-server-caching";

import { typeDefs, resolvers } from "./graphql";

// @ts-ignore
const PORT = process.env.PORT as number ?? 3000;
const isProduction = process.env.NODE_ENV === "production";

const pluginLandingPage = isProduction
  ? ApolloServerPluginLandingPageDisabled()
  : ApolloServerPluginLandingPageLocalDefault();

const pluginCacheControl = ApolloServerPluginCacheControl({
  defaultMaxAge: 5,
  calculateHttpHeaders: false
});

const index = new ApolloServer({
  typeDefs, resolvers,
  introspection: !isProduction,
  plugins: [ pluginLandingPage, pluginCacheControl ],
  cache: new InMemoryLRUCache({ maxSize: 500 * 1024 ** 2 })
});

index.listen(PORT).then((info) => console.log(`Listening on ${ info.url }`));
