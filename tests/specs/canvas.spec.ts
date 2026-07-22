import { expect, test } from "@playwright/test";

import { locators } from "../locators/mirador";

const PORT = process.env.PORT ?? 3000;
const BASE_URL = `http://localhost:${PORT}`;

test("canvas nagivation by keyboard", async ({ page }) => {
  let totalCanvases: number;
  let currentCanvas: number;

  await test.step("load demo page", async () => {
    // load demo page
    await page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
    });

    // verify, that the page is properly loaded by evaluating the position counter
    // (beware, initially it is zero, and it takes a few updates until it reaches its
    // final number)
    const locator = page.locator(locators.positionCounter);
    await locator.waitFor({ state: "visible" });
    await expect(locator).toHaveText(/[1-9]\d* of [1-9]\d*/);

    // extract the number of total canvases
    const text = await locator.innerText();
    const match = /(\d+) of (\d+)/.exec(text);
    if (!match) throw new Error("The counters could not be extracted.");

    currentCanvas = Number(match[1]);
    totalCanvases = Number(match[2]);
  });

  await test.step("navigate to previous canvas", async () => {
    // keypress "left" to navigate to previous canvas
    await page.keyboard.press("ArrowLeft");

    // verify, that we are on canvas (currentCanvas-1)
    const previousCanvas = currentCanvas - 1;
    await expect(page.locator(locators.positionCounter)).toHaveText(
      previousCanvas + " of " + totalCanvases,
    );
  });

  await test.step("navigate to next canvas", async () => {
    // keypress "right" to navigate to next canvas
    await page.keyboard.press("ArrowRight");

    // verify, that we are on canvas (currentCanvas)
    await expect(page.locator(locators.positionCounter)).toHaveText(
      currentCanvas + " of " + totalCanvases,
    );

    // keypress "space" to navigate to next canvas
    await page.keyboard.press("Space");

    // verify, that we are on canvas (currentCanvas+1)
    const nextCanvas = currentCanvas + 1;
    await expect(page.locator(locators.positionCounter)).toHaveText(
      nextCanvas + " of " + totalCanvases,
    );
  });

  await test.step("navigate to first canvas", async () => {
    // keypress "ctrl+left" to navigate to first canvas
    await page.keyboard.press("Control+ArrowLeft");

    // verify, that we are on canvas 1
    await expect(page.locator(locators.positionCounter)).toHaveText(/1 of \d+/);
  });

  await test.step("navigate to last canvas", async () => {
    // keypress "ctrl+right" to navigate to last canvas
    await page.keyboard.press("Control+ArrowRight");

    // verify, that we are on the last canvas
    await expect(page.locator(locators.positionCounter)).toHaveText(
      totalCanvases + " of " + totalCanvases,
    );
  });
});
