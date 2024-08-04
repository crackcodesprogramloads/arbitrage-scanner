import { SessionAuthForNextJS } from "../components/auth/SessionAuthForNextJS";
import getSSRSessionHelper from "../server-functions/getSSRSessionHelper";
import { redirect } from "next/navigation";

import { ensureSuperTokensInit } from "../config/backend";
import { TryRefreshComponent } from "../components/auth/TryRefreshClientComponent";

ensureSuperTokensInit();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, hasToken, hasInvalidClaims, error, authId } = await getSSRSessionHelper();

  // console.log("I am refreshing!");

  if (error) {
    return <div>Something went wrong while trying to get the session. Error - {error.message}</div>;
  }

  if (!session || !authId) {
    if (!hasToken) {
      redirect("/auth");
    }

    /**
     * `hasInvalidClaims` indicates that session claims did not pass validation. For example if email
     * verification is required but the user's email has not been verified.
     */
    if (hasInvalidClaims) {
      /**
       * This will make sure that the user is redirected based on their session claims. For example they
       * will be redirected to the email verification screen if needed.
       *
       * We pass in no children in this case to prevent hydration issues and still be able to redirect the
       * user.
       */
      return <SessionAuthForNextJS />;
    } else {
      /**
       * This means that the session does not exist but we have session tokens for the user. In this case
       * the `TryRefreshComponent` will try to refresh the session.
       *
       * To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
       */
      return <TryRefreshComponent key={Date.now()} />;
    }
  }

  return <SessionAuthForNextJS>{children}</SessionAuthForNextJS>;
}
