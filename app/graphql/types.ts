import gql from "graphql-tag";
import { BinanceAPI, KucoinAPI } from "./dataSources";

export type ContextValue = {
  dataSources: {
    kucoinAPI: KucoinAPI;
    binanceAPI: BinanceAPI;
  };
};

export const typeDefs = gql`
  type Query {
    kucoinPrice(coin: String): String!
    binancePrice(coin: String): String!
  }
`;
