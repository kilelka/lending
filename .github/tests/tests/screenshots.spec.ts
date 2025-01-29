import { test, expect, type Page } from "@playwright/test";

test.describe("Screenshot tests", (workerInfo) => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });
  const selectorScreenshoter = (
    selector: string,
    skipMobile: boolean = false,
  ) => {
    test(`${selector} should equal`, async ({ page }, testInfo) => {
      if (testInfo.project.name === "chromium-mobile") {
        if (skipMobile) {
          test.skip();
        }
      }
      await expect(page.locator(selector)).toHaveScreenshot(`${selector}.png`, {
        maxDiffPixelRatio: 0.1,
      });
    });
  };
  selectorScreenshoter("footer");
  selectorScreenshoter("header");
  selectorScreenshoter("#migration");
  selectorScreenshoter("#products");
  selectorScreenshoter("#reliability", true);
});
