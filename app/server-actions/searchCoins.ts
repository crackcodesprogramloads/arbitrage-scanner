"use server";

import prisma from "../lib/prismaClient";

export async function searchCoins(search: string) {
  const searchResult = await prisma.coin.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "coin-list",
          text: {
            query: search,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
    ],
  });

  return searchResult;
}
