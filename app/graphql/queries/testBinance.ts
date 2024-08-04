import { cookies } from "next/headers";
import { query } from "@/app/lib/getApolloClient";
import gql from "graphql-tag";

const PRICE_QUERY = gql`
  query Query($coin: String) {
    binancePrice(coin: $coin)
  }
`;

export const testBinance = async (coin: string) => {
  let token = cookies().get("sAccessToken")!.value;

  const { data } = await query({
    query: PRICE_QUERY,
    variables: { coin },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return data.binancePrice;
};
