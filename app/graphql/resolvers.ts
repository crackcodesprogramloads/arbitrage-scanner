import { ContextValue } from "./types";

export const resolvers = {
  Query: {
    coinPrice: async (_: any, { coin }: { coin: string }, { dataSources }: ContextValue) => {
      return dataSources.kucoinAPI.getCoinPrice(coin);
    },
  },
};
