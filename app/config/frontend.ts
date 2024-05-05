import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [ThirdPartyEmailPasswordReact.Google.init(), ThirdPartyEmailPasswordReact.Github.init()],
        },
        useShadowDom: false,
        style: `
                [data-supertokens~=container] {
                    --palette-background: 51, 51, 51;
                    --palette-inputBackground: 41, 41, 41;
                    --palette-textTitle: 255, 255, 255;
                    --palette-textLabel: 255, 255, 255;
                    --palette-textPrimary: 255, 255, 255;
                    --palette-error: 173, 46, 46;
                    --palette-textInput: 169, 169, 169;
                    --palette-textLink: 169, 169, 169;
                    --font-size-1: 16px;
                    --font-size-4: 28px;
                }
            `,
      }),
      SessionReact.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  };
};
