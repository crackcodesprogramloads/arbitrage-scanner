import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    coinPrice(coin: String): String!
  }
`;
