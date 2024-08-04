import { ContextValue } from "./types";

export const resolvers = {
  Query: {
    kucoinPrice: async (_: any, { coin }: { coin: string }, { dataSources }: ContextValue) => {
      return dataSources.kucoinAPI.getKucoinPrice(coin);
    },
    binancePrice: async (_: any, { coin }: { coin: string }, { dataSources }: ContextValue) => {
      return dataSources.binanceAPI.getBinancePrice(coin);
    },
  },
};
