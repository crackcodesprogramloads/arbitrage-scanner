import SideNav from "../components/sidenav/SideNav";
import NewsContainer from "../components/NewsContainer";
import { SessionAuthForNextJS } from "../components/auth/SessionAuthForNextJS";

export default function Dashboard() {
  return (
    <SessionAuthForNextJS>
      <main className="w-screen h-screen p-10 flex flex-col items-center">
        <div className="w-full h-full flex flex-row gap-5">
          <SideNav />
          <NewsContainer />
        </div>
      </main>
    </SessionAuthForNextJS>
  );
}
