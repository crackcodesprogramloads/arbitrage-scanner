import SuperTokens from "supertokens-node";
import ThirdPartyEmailPasswordNode, { type APIInterface } from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI: "https://st-dev-928cb160-05dd-11ef-a26e-db334e00f86d.aws.supertokens.io",
      apiKey: "=uV=nDrOJpgGAKMIdZyokBTO90",
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.

        // override: {
        //   apis: (originalImplementation) => {
        //     const thirdPartySignInUpPOST: ThirdPartyEmailPasswordNode.APIInterface["thirdPartySignInUpPOST"] = async (input) => {
        //       if (originalImplementation.thirdPartySignInUpPOST === undefined) {
        //         throw Error("Should never come here");
        //       }

        //       const data = await originalImplementation.thirdPartySignInUpPOST(input);

        //       // todo: POST to database here
        //       if (data.status === "OK") {
        //         const authUserID = data.user.id;
        //         const authUserEmail = data.user.emails[0];
        //         const authUserTimeJoined = data.user.timeJoined;

        //         await createUser(authUserID, authUserEmail, authUserTimeJoined);
        //       }

        //       return data;
        //     };

        //     const emailPasswordSignUpPOST: ThirdPartyEmailPasswordNode.APIInterface["emailPasswordSignUpPOST"] = async (input) => {
        //       if (originalImplementation.emailPasswordSignUpPOST === undefined) {
        //         throw Error("Should never come here");
        //       }

        //       const data = await originalImplementation.emailPasswordSignUpPOST(input);

        //       // todo: POST to database here
        //       if (data.status === "OK") {
        //         const authUserID = data.user.id;
        //         const authUserEmail = data.user.emails[0];
        //         const authUserTimeJoined = data.user.timeJoined;

        //         await createUser(authUserID, authUserEmail, authUserTimeJoined);
        //       }

        //       return data;
        //     };

        //     return {
        //       ...originalImplementation,
        //       thirdPartySignInUpPOST,
        //       emailPasswordSignUpPOST,
        //     };
        //   },
        // },

        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                  clientSecret: "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",
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "github",
              clients: [
                {
                  clientId: "467101b197249757c71f",
                  clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                },
              ],
            },
          },
        ],
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
