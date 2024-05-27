"use client";

import { useSessionContext } from "supertokens-auth-react/recipe/session";

import { searchCoins } from "@/app/server-actions/searchCoins";
import { useEffect, useState } from "react";
import { updateWatchlist } from "@/app/server-actions/updateWatchlist";
import getUserWatchlist from "@/app/server-actions/getUserWatchlist";

type Coin = { name: string; ticker: string; id: string };

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [watchlistCoinList, setWatchlistCoinList] = useState<string[]>([]);

  const session = useSessionContext();

  useEffect(() => {
    getWatchlistCoins().then();
  }, []);

  useEffect(() => {
    if (search.trim().length === 0) {
      setIsDropdownOpen(false);
    }
  }, [search]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setSearch(event.target.value);
    }
  };

  const handleCoinRetrieval = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredCoins = await searchCoins(search);

    // @ts-ignore
    const filteredCoinsArray = filteredCoins?.map((coin) => {
      return { ...coin, id: coin._id.$oid };
    });

    setCoinData(filteredCoinsArray);
    setIsDropdownOpen(true);
  };

  const getWatchlistCoins = async () => {
    try {
      if (session.loading) {
        throw Error("Auth session currently loading, please try adding coin again.");
      }

      const userID = session.userId;

      const userWatchlist = await getUserWatchlist(userID);

      if (!userWatchlist) {
        return;
      }

      setWatchlistCoinList(userWatchlist.coinList);
    } catch (error) {
      // toast the error message here to the user
    }
  };

  const handleAddCoinToWatchlist = async (coin: Coin) => {
    try {
      if (session.loading) {
        throw Error("Auth session currently loading, please try adding coin again.");
      }

      const userID = session.userId;

      await updateWatchlist(userID, coin.id, coin.ticker);
      await getWatchlistCoins();
    } catch (error) {
      // toast the error message here to the user
    }
  };

  return (
    <div className="w-full px-4 py-2 flex flex-col items-center justify-center gap-2 rounded-xl shadow-lg shadow-gray-700">
      <form onSubmit={handleCoinRetrieval} className="flex flex-row items-center justify-between">
        <input
          value={search}
          onChange={handleSearchInput}
          className="bg-transparent outline-none border-b border-gray-300"
          type="text"
          placeholder="Search coin..."
        />
        <button type="submit" aria-label="submit search">
          <svg
            className="cursor-pointer hover:text-white"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="22px"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"></path>
          </svg>
        </button>
      </form>

      <table
        className={`w-full max-h-40 ${
          coinData && isDropdownOpen ? "inline-block" : "hidden"
        } py-1 flex flex-col items-center justify-between gap-1 overflow-y-scroll`}
      >
        <tbody>
          {coinData?.map((coin) => (
            <tr className="w-full border-b border-gray-700" key={coin.ticker}>
              <td className="w-2/3">{coin.name}</td>
              <td className="w-1/3">{coin.ticker}</td>
              <td className="w-1/3">
                <svg
                  onClick={() => handleAddCoinToWatchlist(coin)}
                  className="cursor-pointer"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 576 512"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill={watchlistCoinList.includes(coin.id) ? "orange" : "currentColor"}
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
