import prisma from "@/app/lib/prismaClient";

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || "";

const options = {
  method: "GET",
  headers: { accept: "application/json", "x-cg-demo-api-key": COINGECKO_API_KEY },
};

let page = 2;
const max_page = 16;

new Array(16).fill(0).forEach(async () => {
  console.log("starting next loop");
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`, options)
    .then((response) => response.json())
    .then(async (response) => {
      const data = response.map((coin: { name: string; symbol: string }) => {
        // insert row into model coin
        return {
          name: coin.name,
          ticker: coin.symbol,
        };
      });

      await prisma.coin.createMany({
        data,
      });

      console.log("saved page: ", page);

      page++;
    })
    .catch((err) => {
      console.error(err.message);
    });
});
