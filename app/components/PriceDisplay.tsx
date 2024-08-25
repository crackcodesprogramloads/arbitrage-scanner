"use client";

import { gql, useQuery } from "@apollo/client";
// import { useCookies } from "next-client-cookies";

export default function PriceDisplay({ coin }: { coin: string }) {
  // const cookies = useCookies();
  // const token = cookies.get("sAccessToken");

  const KUCOIN_QUERY = gql`
    query Query($coin: String) {
      kucoinPrice(coin: $coin)
    }
  `;

  const BINANCE_QUERY = gql`
    query Query($coin: String) {
      binancePrice(coin: $coin)
    }
  `;

  const { data: kucoinData, error: kucoinError } = useQuery(KUCOIN_QUERY, {
    variables: { coin },
    // pollInterval: 10000,
    context: {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    },
  });

  const { data: binanceData, error: binanceError } = useQuery(BINANCE_QUERY, {
    variables: { coin },
    // pollInterval: 10000,
    context: {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    },
  });

  const kucoinPrice = kucoinData?.kucoinPrice?.slice(0, -12);
  const binancePrice = binanceData?.binancePrice?.slice(0, -4);

  // console.log(binanceError?.message);

  return (
    <div className="flex flex-row items-center justify-center">
      <p className="h-10 flex items-center px-4 border-t-2 border-l-2 border-b-2 rounded-l-xl">{coin}</p>
      <div className="w-52 h-10 px-4 flex flex-row items-center justify-between border-t-2 border-b-2 border-green-500 gap-2">
        <p className="text-green-500">KUCOIN</p>
        <p> {kucoinError ? kucoinError.message : kucoinPrice}</p>
      </div>
      <div className="w-52 h-10 px-4 flex flex-row items-center justify-between border-t-2 border-r-2 border-b-2 border-yellow-500 rounded-r-lg gap-2">
        <p className="text-yellow-500">BINANCE</p>
        <p> {binanceError ? binanceError.message : binancePrice}</p>
      </div>
    </div>
  );
}
