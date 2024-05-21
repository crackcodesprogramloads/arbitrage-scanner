import { test } from "@playwright/test";
const fs = require("fs");

const username = process.env.NEXT_PUBLIC_TEST_USER_NAME || "";
const password = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || "";

test("Sign up and capture state", async ({ page }) => {
  await page.goto("http://localhost:3000/auth");

  await page.locator('span[data-supertokens="link"]').click();
  console.log("sign up should be clicked");

  await page.locator("input[name='email']").fill(username);
  console.log(username, "username should be filled");

  await page.locator("input[name='password']").fill(password);
  console.log(password, "password should be filled");

  await page.locator('button[type="submit"]').click();
  console.log("form should be submitted");

  await page.waitForURL("http://localhost:3000");

  const storageState = await page.context().storageState();
  console.log(storageState);

  await fs.writeFile("user.json", JSON.stringify(storageState, null, 2), (err: any) => {
    if (err) {
      console.error("Error writing state to file:", err);
    } else {
      console.log("State saved to auth_state.json");
    }
  });
});
