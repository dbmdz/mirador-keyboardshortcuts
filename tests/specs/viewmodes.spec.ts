import { test, expect } from '@playwright/test';
import { locators } from '../locators/mirador';

test('view modes by keyboard', async({page}) => {

   await test.step('load demo page', async() => {
        // load demo page
        await page.goto('http://localhost:3000');

        // verify, that the page is loaded, initial in single view mode
        await expect(page.locator(locators.single)).toBeVisible();
    });     

   await test.step('change to gallery view', async() => {
        // keypress "g" to activate gallery view
        await page.keyboard.press('g');

        // verify, that we are in the gallery view
        await expect(page.locator(locators.gallery)).toBeVisible();
    });

    await test.step('change to book view', async() => {
        // keypress "g" to activate book view
        await page.keyboard.press('b');

        // verify, that we are in the book view
        await expect(page.locator(locators.book)).toBeVisible();
    });
});