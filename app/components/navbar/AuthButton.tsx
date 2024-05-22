"use client";

import Image from "next/image";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import LOADING from "../../../public/loading.svg";

const buttonCSS = "w-28 fixed top-2 right-8 px-4 py-2 flex items-center justify-center border rounded-lg";

export default function AuthButton() {
  const session = useSessionContext();

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }

  if (session.loading) {
    return (
      <button className={buttonCSS}>
        <Image className="animate-spin" src={LOADING} alt="loading icon" width={24} height={24} />
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
