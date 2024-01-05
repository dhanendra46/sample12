const { test } = require("@playwright/test")
const { chromium } = require('playwright');

test("sample cookies", async () => {
    // Launch the browser
    const browser = await chromium.launch();

    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to a website
    await page.goto('https://example.com');

    // Handle cookies - set a cookie for the context
    const currentDate = new Date().toISOString();
    console.log(`Current date: ${currentDate}`);

    await context.addCookies([
        {
            name: 'exampleCookie',
            value: 'exampleValue',
            domain: 'example.com',
            path: '/',
            expires: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
        },
    ]);

    // Interact with session storage
    await page.evaluate(() => {
        // Set a value in session storage
        sessionStorage.setItem('key', 'value');
    });

    // Retrieve a value from session storage
    const value = await page.evaluate(() => {
        return sessionStorage.getItem('key');
    });

    console.log('Value from session storage:', value);
    await browser.close();
})
