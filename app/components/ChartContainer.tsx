import { getCoinsInWatchlist } from "../server-functions/getUserWatchlist";
import ArbitrageChart from "./ArbitrageChart";
// import PriceDisplay from "./PriceDisplay";

export default async function ChartContainer() {
  const watchlistCoins = await getCoinsInWatchlist();

  return (
    <div className="w-full grid grid-cols-2 gap-5">
      {watchlistCoins?.map((coin, i) => {
        return (
          <>
            {/* <PriceDisplay coin={coin} key={i} /> */}
            <ArbitrageChart coin={coin} key={i} />
          </>
        );
      })}
    </div>
  );
}
