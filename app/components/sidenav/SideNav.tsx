import SearchFilter from "./SearchFilter";
import Searchbar from "./Searchbar";
import Watchlist from "./Watchlist";

export default function SideNav() {
  return (
    <div className="w-80 h-full p-4 flex flex-col gap-4 border rounded-xl border-gray-700 shadow-lg shadow-gray-700">
      <Searchbar />
      <Watchlist />
      <SearchFilter />
    </div>
  );
}
