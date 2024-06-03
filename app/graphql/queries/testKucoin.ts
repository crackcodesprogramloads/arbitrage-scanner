import { cookies } from "next/headers";
import gql from "graphql-tag";
import { query } from "@/app/lib/getApolloClient";

const PRICE_QUERY = gql`
  query Query($coin: String) {
    coinPrice(coin: $coin)
  }
`;

export const testKucoin = async (coin: string) => {
  const ourCookies = cookies();

  //   let token = await ourCookies.get("jwtToken")!.value;
  let token = ourCookies.get("sAccessToken")!.value;

  //   let jwtToken = JSON.parse(token);

  const { data } = await query({
    query: PRICE_QUERY,
    variables: { coin },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return data.coinPrice;
};
