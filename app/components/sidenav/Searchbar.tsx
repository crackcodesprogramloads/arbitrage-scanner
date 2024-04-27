"use client";

import { useEffect, useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coinData, setCoinData] = useState([
    { name: "Bitcoin", ticker: "BTC", inWatchlist: false },
    { name: "Ethereum", ticker: "ETH", inWatchlist: false },
    { name: "Cardano", ticker: "ADA", inWatchlist: false },
    { name: "Solana", ticker: "SOL", inWatchlist: false },
    { name: "Matic", ticker: "MATIC", inWatchlist: false },
    { name: "Meter", ticker: "MTRG", inWatchlist: false },
  ]);

  useEffect(() => {
    if (search.trim().length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setSearch(event.target.value);
    }
  };

  const handleCoinIsStarred = (event: any, coin: { name: string; ticker: string; inWatchlist: boolean }) => {
    const updatedCoin = { ...coin, inWatchlist: !coin.inWatchlist };
    const updatedCoinData = coinData.map((c) => (c.name === coin.name ? updatedCoin : c));
    setCoinData(updatedCoinData);
  };

  const filteredCoins = coinData.filter((coin) => coin.name.toLowerCase().startsWith(search.toLowerCase()));

  const coinList = filteredCoins.map((coin) => (
    <div className="w-full flex flex-row items-center justify-between gap-4" key={coin.name}>
      <p>{coin.name}</p>
      <p>{coin.ticker}</p>
      <svg
        onClick={() => handleCoinIsStarred(event, coin)}
        className="cursor-pointer"
        stroke="currentColor"
        strokeWidth="1"
        viewBox="0 0 576 512"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={coin.inWatchlist ? "orange" : "currentColor"}
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        ></path>
      </svg>
    </div>
  ));

  return (
    <div className="px-4 py-2 flex flex-col items-center justify-center gap-2 border rounded-xl border-gray-700 shadow-lg shadow-gray-700">
      <input
        value={search}
        onChange={handleSearch}
        className="bg-transparent outline-none border-b border-gray-700"
        type="text"
        placeholder="Search coin..."
      />
      {isDropdownOpen && coinList}
    </div>
  );
}
