import { cache } from "react";
import prisma from "../lib/prismaClient";

export type SearchCoinsResult =
  | {
      name: string;
      id: string;
      ticker: string;
    }[]
  | null;

export const searchCoins = cache(async (searchQuery: string) => {
  console.time("searchCoins");
  const searchResult = await prisma.coin.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "coin-list",
          text: {
            query: searchQuery,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
    ],
  });
  console.timeEnd("searchCoins");

  // @ts-ignore
  return searchResult?.map((coin) => {
    return { name: coin.name, ticker: coin.ticker, id: coin._id.$oid };
  }) as SearchCoinsResult;
});
