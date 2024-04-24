import Searchbar from "./Searchbar";
import Watchlist from "./Watchlist";

export default function SideNav() {
  return (
    <div className="w-80 h-full border rounded-xl">
      <Searchbar />
      <Watchlist />
    </div>
  );
}
