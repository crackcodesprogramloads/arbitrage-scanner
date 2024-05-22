"use client";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Link from "next/link";

export default function SignUpButton() {
  const session = useSessionContext();

  return (
    <Link href={!session.loading && session.doesSessionExist ? "/dashboard" : "/auth"}>
      <button className="px-4 py-2 text-2xl lg:text-3xl border rounded-xl shadow-md shadow-white">
        {!session.loading && session.doesSessionExist ? "Dashboard" : "Sign up"}
      </button>
    </Link>
  );
}
