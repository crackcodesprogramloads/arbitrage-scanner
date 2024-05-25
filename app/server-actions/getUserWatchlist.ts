"use server";

import prisma from "../lib/prismaClient";

export default async function getUserWatchlist(authUserID: string) {
  const userWatchlist = await prisma.watchlist.findUnique({
    where: { authId: authUserID },
  });

  return userWatchlist;
}
