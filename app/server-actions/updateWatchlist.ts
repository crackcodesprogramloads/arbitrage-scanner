"use server";

import prisma from "../lib/prismaClient";
import getSSRSessionHelper from "../server-functions/getSSRSessionHelper";
import { getUserWatchlist } from "../server-functions/getUserWatchlist";

export async function updateWatchlist(coinId: string) {
  const { authId } = await getSSRSessionHelper();

  if (!authId) {
    throw Error("Missing authId in updateWatchlist");
  }

  const userWatchlist = await getUserWatchlist();

  if (!userWatchlist) {
    try {
      const coinIds = [coinId];
      await prisma.watchlist.create({
        data: {
          authId,
          coinIds,
        },
      });
      return coinIds;
    } catch (error: any) {
      throw Error(`Error creating new watchlist: ${error.message}`);
    }
  } else {
    let updatedCoinList = [];

    const isCoinStarred = userWatchlist.coinIds.includes(coinId);

    if (isCoinStarred) {
      updatedCoinList = userWatchlist.coinIds.filter((existingCoinId) => existingCoinId !== coinId);
    } else {
      updatedCoinList = [...userWatchlist.coinIds, coinId];
    }

    try {
      await prisma.watchlist.update({
        where: { authId },
        data: {
          coinIds: updatedCoinList,
        },
      });
      return updatedCoinList;
    } catch (error: any) {
      throw Error(`Error updating users watchlist: ${error.message}`);
    }
  }
}
