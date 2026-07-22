import { expect, test } from "@playwright/test";

const PORT = process.env.PORT ?? 3000;
const BASE_URL = `http://localhost:${PORT}`;

test.skip("fullscreen toogle (currently disabled because of no fullscreen evaluation mechanism available)", async ({
  page,
}) => {
  await test.step("load demo page", async () => {
    // load demo page
    await page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
    });
  });

  await test.step("send application into fullscreen mode", async () => {
    // keypress "f" to activate fullscreen mode
    await page.keyboard.press("f");

    // verify fullscreen mode
    const isFullscreen = await page.evaluate(() => {
      return document.fullscreenElement !== null;
    });

    expect(isFullscreen).toBe(true);
  });

  await test.step("send application back to window mode", async () => {
    // keypress "f" to deactivate fullscreen mode
    await page.keyboard.press("f");

    // verify fullscreen mode
    const isFullscreen = await page.evaluate(() => {
      return document.fullscreenElement !== null;
    });

    expect(isFullscreen).toBe(false);
  });
});
