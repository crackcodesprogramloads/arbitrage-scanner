import { testBinance } from "../graphql/queries/testBinance";
import { testKucoin } from "../graphql/queries/testKucoin";

export default function TestGraphQL() {
  const kucoinResult = async () => {
    try {
      const result = await testKucoin("ADA");
      return result.slice(0, -12);
    } catch (error) {
      return <p>Nothing found</p>;
    }
  };
  const binanceResult = async () => {
    try {
      const result = await testBinance("ADA");
      return result.slice(0, -4);
    } catch (error) {
      return <p>Nothing found</p>;
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold">Kucoin result</p>
        <p className="w-80 h-10 flex items-center justify-center border border-green-500 rounded-lg">{kucoinResult()}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold">Binance result</p>
        <p className="w-80 h-10 flex items-center justify-center border border-orange-500 rounded-lg">{binanceResult()}</p>
      </div>
    </div>
  );
}
