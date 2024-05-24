import prisma from "@/app/lib/prismaClient";

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || "";

const options = {
  method: "GET",
  headers: { accept: "application/json", "x-cg-demo-api-key": COINGECKO_API_KEY },
};

const max_page = 16;

new Array(max_page).fill(0).forEach(async (_, index) => {
  console.log("starting next loop");

  const page = index + 1;

  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`, options)
    .then((response) => response.json())
    .then(async (response) => {
      const data = response.map((coin: { name: string; symbol: string }) => {
        // insert row into model coin
        const inWatchlist = false;

        return {
          name: coin.name,
          ticker: coin.symbol,
          inWatchlist,
        };
      });

      await prisma.coin.createMany({
        data,
      });

      console.log("saved page: ", page);
      console.log("data: ", JSON.stringify(data));
    })
    .catch((err) => {
      console.error(err.message);
    });
});
