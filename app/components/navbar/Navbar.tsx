"use client";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function Navbar() {
  const session = useSessionContext();

  async function onLogout() {
    await signOut();
    window.location.href = "/dashboard"; // or to wherever your logic page is
  }

  // if (session.loading) {
  //   return <div>Loading...</div>;
  // }

  // if (session.doesSessionExist === false) {
  //   return <div>Session does not exist</div>;
  // }

  return (
    <div className="h-16 flex flex-row items-center justify-around border-b border-gray-700 shadow-lg shadow-gray-800">
      <h1 className="text-4xl">COIN NEWS AGGREGATOR</h1>
      {!session.loading && session.doesSessionExist ? (
        <button onClick={onLogout} className="fixed top-2 right-8 px-4 py-2 border rounded-lg">
          Sign out
        </button>
      ) : null}
    </div>
  );
}
