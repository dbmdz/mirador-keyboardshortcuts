import { expect, Page, test } from "@playwright/test";

const PORT = process.env.PORT ?? 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function checkExpectedView(
  page: Page,
  expected: "single" | "book" | "gallery",
) {
  // click on "Window views & thumbnail display" button
  const button = page.getByRole("button", {
    name: /window views/i,
  });
  await button.click();

  // fetch the menu
  const navigationMenu = page.locator(
    '[role="menu"], .MuiPopover-root, .MuiMenu-root',
  );

  // retrieve the icons
  const icons = navigationMenu.locator("svg[value]");

  // now check of the first three icons, which icon is highlighted and read its value below
  let selectedValue: string | null = null;
  let selectedCount = 0;

  for (let i = 0; i < 3; i++) {
    const icon = icons.nth(i);
    const classAttr = await icon.getAttribute("class");

    if (classAttr?.includes("MuiSvgIcon-colorSecondary")) {
      selectedCount++;
      selectedValue = await icon.getAttribute("value");
    }
  }

  expect(selectedCount).toBe(1);
  expect(selectedValue).toBe(expected);

  // close the popup
  await page.keyboard.press("Escape");
}

test("view modes by keyboard", async ({ page }) => {
  await test.step("load demo page", async () => {
    // load demo page
    await page.goto(BASE_URL);

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
});
