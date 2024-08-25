import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { ApolloServer } from "@apollo/server";

import { BinanceAPI, KucoinAPI } from "@/app/graphql/dataSources";
import { resolvers } from "@/app/graphql/resolvers";
import { ContextValue, typeDefs } from "@/app/graphql/types";

const server = new ApolloServer<ContextValue>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, ContextValue>(server, {
  context: async () => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        kucoinAPI: new KucoinAPI({ cache }),
        binanceAPI: new BinanceAPI({ cache }),
      },
    };
  },
});

export { handler as GET, handler as POST };
