"use client";

import { SessionAuth } from "supertokens-auth-react/recipe/session";
import SideNav from "../components/sidenav/SideNav";
import NewsContainer from "../components/NewsContainer";

export default function Dashboard() {
  return (
    <SessionAuth>
      <main className="w-screen h-screen p-10 flex flex-col items-center">
        <div className="w-full h-full flex flex-row gap-5">
          <SideNav />
          <NewsContainer />
        </div>
      </main>
    </SessionAuth>
  );
}
