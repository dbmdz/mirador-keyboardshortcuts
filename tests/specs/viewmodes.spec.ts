import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const PORT = process.env.PORT ?? 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function checkExpectedView(
  page: Page,
  expected: "single" | "book" | "gallery",
) {
  const locatorWindowViewsButton = page.getByRole("button", {
    name: /window views/i,
  });
  await locatorWindowViewsButton.waitFor({ state: "visible" });
  // click on "Window views & thumbnail display" button
  await locatorWindowViewsButton.click();

  // fetch the menu
  const navigationMenu = page.locator(
    '[role="menu"], .MuiPopover-root, .MuiMenu-root',
  );

  let selectedValue: string | null = null;
  let selectedCount = 0;

  // retrieve the menuitemradios, but evaluate only the first three of them
  const menuitemradios = navigationMenu.getByRole("menuitemradio");
  for (const menuitemradio of (await menuitemradios.all()).slice(0, 3)) {
    const attrChecked = await menuitemradio.getAttribute("aria-checked");

    console.log(
      `checkExpectedView: ${expected}`,
      await menuitemradio.innerText(),
      attrChecked,
    );

    if (attrChecked === "true") {
      selectedCount++;
      selectedValue = (await menuitemradio.innerText()).toLowerCase();
    }
  }

  // Do we have the expected match?
  expect(selectedCount).toBe(1);
  expect(selectedValue).toBe(expected);

  // close the popup
  await page.keyboard.press("Escape");
}

test("view modes by keyboard", async ({ page }) => {
  await test.step("load demo page", async () => {
    // load demo page
    await page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
    });

    // verify, that the page is loaded, initial in single view mode
    await checkExpectedView(page, "single");
  });

  await test.step("change to gallery view", async () => {
    // keypress "g" to activate gallery view
    await page.keyboard.press("g");

    // verify, that we are in the gallery view
    await checkExpectedView(page, "gallery");
  });

  await test.step("change to book view", async () => {
    // keypress "g" to activate book view
    await page.keyboard.press("b");

    // verify, that we are in the book view
    await checkExpectedView(page, "book");
  });

  await test.step("change to single page view", async () => {
    // keypress "s" to single page view
    await page.keyboard.press("s");

    // verify, that we are in the book view
    await checkExpectedView(page, "single");
  });
});
