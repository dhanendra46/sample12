// tests/spec.js

const { test } = require('@playwright/test');

test('Example test 1', async ({ page }) => {
    const specname = "example 1"
    await page.goto("https://www.youtube.com/")
    await page.click(".container")
    console.log(`::set-output name=failed_spec::${page.testInfo.title}`)
    throw new Error("Your error message ['"+specname+'"]')
});
