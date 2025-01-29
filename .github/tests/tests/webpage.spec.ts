import { test, expect, type Page } from "@playwright/test";

test.describe("Webpage opens", () => {
  test("should open", async ({ page }, testInfo) => {
    await page.goto("./");
    // create a new todo locator
    const screenshot = await page.screenshot({
      fullPage: true,
    });
    await testInfo.attach("screenshot", {
      body: screenshot,
      contentType: "image/png",
    });

    // await expect(page).toHaveTitle("HW2");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText("VK Cloud");
  });
});
