import { searchCoins } from "@/app/server-functions/searchCoins";
import { getUserWatchlist } from "@/app/server-functions/getUserWatchlist";
import SearchFilter from "./SearchFilter";
import Searchbar from "./Searchbar";
import Watchlist from "./Watchlist";

export default async function SideNav({ searchQuery }: { searchQuery?: string }) {
  const searchResult = searchQuery ? await searchCoins(searchQuery) : null;

  const watchlist = await getUserWatchlist();

  return (
    <div className="w-64 h-full p-4 flex flex-col gap-4 border rounded-xl border-gray-700 shadow-lg shadow-gray-700">
      <Searchbar searchResult={searchResult} watchlist={watchlist} />
      <Watchlist watchlist={watchlist} />
      <SearchFilter />
    </div>
  );
}
