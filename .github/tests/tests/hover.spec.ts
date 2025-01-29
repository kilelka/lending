import { test, expect, type Page } from "@playwright/test";

test.describe("Hover tests", () => {
  test("hover event should change content", async ({ page }) => {
    await page.goto("./");
    const STRINGS_TO_TEST = [
      ["Послеаварийное восстановление", "Сертификаты и лицензии"],
      ["Обучение и поддержка", "Бесплатный тьюториал"],
      [
        "Единая отказоустойчивая архитектура с резервированием",
        "Бэкапы по расписанию",
      ],
    ];
    for (const [from, to] of STRINGS_TO_TEST) {
      const el = page.getByText(from);
      await el.scrollIntoViewIfNeeded();
      const box = (await el.boundingBox())!;
      expect(box).not.toBeNull();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await expect(page.getByText(from)).toBeHidden(); // Note that opacity: 0 is considered visible for screen readers.
      // await expect(page.getByText(to)).toBeVisible(); // Note that opacity: 0 is considered visible for screen readers.
    }
  });
});
