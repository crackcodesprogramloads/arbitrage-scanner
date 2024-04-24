import NewsContainer from "./components/NewsContainer";
import SideNav from "./components/sidenav/SideNav";

export default function Home() {
  return (
    <main className="w-screen h-screen p-10 flex flex-col items-center">
      <div className="w-full h-full flex flex-row gap-5">
        <SideNav />
        <NewsContainer />
      </div>
    </main>
  );
}
