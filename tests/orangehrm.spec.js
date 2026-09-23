const { test } = require('@playwright/test');
require('dotenv').config();

test('Open OrangeHRM', async ({ page }) => {
    await page.goto(process.env.APP_URL);
});