import { test, expect } from '@playwright/test';

test('fullscreen toogle', async({page}) => {

    await test.step('load demo page', async() => {
        // load demo page
        await page.goto('http://localhost:3000');
    });

    await test.step('send application into fullscreen mode', async() => {
        // keypress "f" to activate fullscreen mode
        await page.keyboard.press('f');

        // verify fullscreen mode
        const isFullscreen = await page.evaluate(() => {
            return document.fullscreenElement !== null;
        });

        expect(isFullscreen).toBe(true);
    });

    await test.step('send application back to window mode', async() => {
        // keypress "f" to deactivate fullscreen mode
        await page.keyboard.press('f');

        // verify fullscreen mode
        const isFullscreen = await page.evaluate(() => {
            return document.fullscreenElement !== null;
        });

        expect(isFullscreen).toBe(false);
    });
});