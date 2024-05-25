"use server";

import prisma from "../lib/prismaClient";
import getUserWatchlist from "./getUserWatchlist";

export async function updateWatchlist(authUserID: string, coinId: string, coinTicker: string) {
  if (!authUserID || !coinId || !coinTicker) {
    throw Error("Missing required parameters.");
  }

  const userWatchlist = await getUserWatchlist(authUserID);

  if (!userWatchlist) {
    try {
      await prisma.watchlist.create({
        data: {
          authId: authUserID,
          coinList: [coinId],
        },
      });
    } catch (error: any) {
      throw Error(`Error creating new watchlist: ${error.message}`);
    }
  } else {
    let updatedCoinList = [];

    const isCoinStarred = userWatchlist.coinList.includes(coinId);

    if (isCoinStarred) {
      updatedCoinList = userWatchlist.coinList.filter((existingCoinId) => existingCoinId !== coinId);
    } else {
      updatedCoinList = [...userWatchlist.coinList, coinId];
    }

    try {
      await prisma.watchlist.update({
        where: { authId: authUserID },
        data: {
          coinList: updatedCoinList,
        },
      });
    } catch (error: any) {
      throw Error(`Error updating users watchlist: ${error.message}`);
    }
  }
}
