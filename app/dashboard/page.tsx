import SideNav from "../components/sidenav/SideNav";
// import NewsContainer from "../components/NewsContainer";
import ChartContainer from "../components/ChartContainer";
import ArbitrageChart from "../components/ArbitrageChart";

export default async function Dashboard({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  // Getting searchParams from url and passing down to SearchBar
  const searchQuery = searchParams?.search as string | undefined;

  return (
    <main className="w-screen h-screen p-10 flex flex-col items-center">
      <div className="w-full h-full flex flex-row gap-5">
        <SideNav searchQuery={searchQuery} />
        <ChartContainer />
      </div>
    </main>
  );
}
