import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

const username = process.env.NEXT_PUBLIC_TEST_USER_NAME || "";
const password = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || "";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/auth");

  await page.locator("input[name='email']").fill(username);
  await page.locator("input[name='password']").fill(password);

  //   await page.locator('button[type="submit"]').click();

  await page.getByRole("button", { name: "Sign in" }).click();
  //
  await page.waitForURL("http://localhost:3000");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //   await expect(page.getByRole("button", { name: "View profile and more" })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
