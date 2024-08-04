import { SessionContainer } from "supertokens-node/recipe/session";
import { getSSRSession } from "supertokens-node/nextjs";
import { cookies, headers } from "next/headers";
import { ensureSuperTokensInit } from "../config/backend";

ensureSuperTokensInit();

async function getSSRSessionHelper(): Promise<{
  session: SessionContainer | undefined;
  authId: string | undefined;
  hasToken: boolean;
  hasInvalidClaims: boolean;
  error: Error | undefined;
}> {
  let session: SessionContainer | undefined;
  let hasToken = false;
  let hasInvalidClaims = false;
  let error: Error | undefined = undefined;

  console.time("get session");

  try {
    ({ session, hasToken, hasInvalidClaims } = await getSSRSession(cookies().getAll(), headers()));
  } catch (err: any) {
    error = err;
  }
  console.timeEnd("get session");

  const authId = session?.getUserId();

  return { session, authId, hasToken, hasInvalidClaims, error };
}

export default getSSRSessionHelper;
