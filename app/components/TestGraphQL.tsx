import { testBinance } from "../graphql/queries/testBinance";
import { testKucoin } from "../graphql/queries/testKucoin";
import { getCoinsInWatchlist } from "../server-functions/getUserWatchlist";

export default async function TestGraphQL() {
  const watchlistCoins = await getCoinsInWatchlist();

  const kucoinResult = async (coin: string) => {
    try {
      const result = await testKucoin(coin);
      return result.slice(0, -12);
    } catch (error) {
      return <p>Nothing found</p>;
    }
  };
  const binanceResult = async (coin: string) => {
    try {
      const result = await testBinance(coin);
      return result.slice(0, -4);
    } catch (error) {
      return "Nothing found";
    }
  };

  return (
    <div className="w-full p-5 flex flex-col items-center gap-4 border rounded-xl border-gray-700 shadow-lg shadow-gray-700">
      {watchlistCoins?.map((coin) => {
        return (
          <div className="flex flex-row items-center justify-center gap-4">
            <p>{coin}</p>
            <div className="flex flex-col items-center gap-2">
              <p className="w-80 h-10 flex items-center justify-center border border-green-500 rounded-lg">Kucoin - {kucoinResult(coin)}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="w-80 h-10 flex items-center justify-center border border-orange-500 rounded-lg">
                Binance - {binanceResult(coin)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
