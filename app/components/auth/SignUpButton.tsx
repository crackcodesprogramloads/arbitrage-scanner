import Link from "next/link";
import { getSSRSession } from "supertokens-node/nextjs";
import { cookies, headers } from "next/headers";
import { SessionContainer } from "supertokens-node/recipe/session";
import { ensureSuperTokensInit } from "@/app/config/backend";

ensureSuperTokensInit();

export default async function SignUpButton() {
  let session: SessionContainer | undefined;
  let hasToken = false;
  let hasInvalidClaims = false;
  let error: Error | undefined = undefined;

  ({ session, hasToken, hasInvalidClaims } = await getSSRSession(cookies().getAll(), headers()));

  return (
    <Link href={!session && !hasToken ? "/auth" : "/dashboard"}>
      <button className="px-4 py-2 text-2xl lg:text-3xl border rounded-xl shadow-md shadow-white">
        {!session && !hasToken ? "Sign up" : "Dashboard"}
      </button>
    </Link>
  );
}
