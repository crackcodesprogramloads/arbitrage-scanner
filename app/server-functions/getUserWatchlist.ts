import { cache } from "react";

import type { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient";

import getSSRSessionHelper from "./getSSRSessionHelper";

export const getUserWatchlist = async () => {
  const { authId } = await getSSRSessionHelper();

  if (!authId) {
    throw Error("Missing authId in getUserWatchlist");
  }

  const userWatchlist = await prisma.watchlist.findUnique({
    where: { authId },
    include: { coins: true },
  });

  return userWatchlist;
};

export const getCoinsInWatchlist = async () => {
  try {
    const watchlist = await getUserWatchlist();

    const coins = watchlist?.coins.map((coin) => {
      return coin.ticker.toUpperCase();
    });

    return coins;
  } catch (error) {
    console.log("Error getting coins in watchlist");
  }
};

export type WatchlistByUserIdQueryResult = Prisma.PromiseReturnType<typeof getUserWatchlist>;
