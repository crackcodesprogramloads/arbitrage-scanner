"use client";

import Image from "next/image";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import LOADING from "../../../public/loading.svg";

const buttonCSS = "w-40 sm:w-28 h-10 lg:absolute lg:right-8 px-4 py-2 flex items-center justify-center text-lg sm:border rounded-lg";

export default function AuthButton() {
  const session = useSessionContext();

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }

  if (session.loading) {
    return (
      <button className={buttonCSS}>
        <Image className="animate-spin" src={LOADING} alt="loading icon" width={28} height={28} />
      </button>
    );
  } else if (session.doesSessionExist) {
    return (
      <button onClick={onLogout} className={buttonCSS}>
        Sign out
      </button>
    );
  } else if (!session.doesSessionExist) {
    return (
      <button onClick={() => (window.location.href = "/auth")} className={buttonCSS}>
        Sign in
      </button>
    );
  }
}
