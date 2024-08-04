"use client";

import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

import { updateWatchlist } from "@/app/server-actions/updateWatchlist";
import { WatchlistByUserIdQueryResult } from "@/app/server-functions/getUserWatchlist";

type Coin = { name: string; ticker: string; id: string };

export default function Watchlist({ watchlist }: { watchlist: WatchlistByUserIdQueryResult }) {
  const router = useRouter();

  const handleRemoveCoinFromWatchlist = async (coin: Coin) => {
    try {
      const coinIds = await updateWatchlist(coin.id);

      router.refresh();
    } catch (error) {
      // toast the error message here to the user
    }
  };

  return (
    <div className="w-full px-4 py-2 flex flex-col items-center justify-center gap-2 rounded-xl shadow-lg shadow-gray-700">
      <p>Watchlist</p>
      <table
        className={`w-full max-h-40 ${
          watchlist ? "inline-block" : "hidden"
        } py-1 flex flex-col items-center justify-between gap-1 overflow-y-scroll`}
      >
        <tbody className="w-full">
          {watchlist?.coins.map((coin) => (
            <tr className="w-full border-b border-gray-700" key={coin.id}>
              <td className="w-2/3">{coin.name}</td>
              <td className="w-1/3">{coin.ticker}</td>
              <td className="w-1/3">
                <svg
                  onClick={() => handleRemoveCoinFromWatchlist(coin)}
                  className="cursor-pointer"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 576 512"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="orange"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  ></path>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
