import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    kucoinPrice(coin: String): String!
    binancePrice(coin: String): String
  }
`;
