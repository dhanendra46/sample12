const { test } = require('@playwright/test');
const { _android: android } = require('playwright')
test("Run in Android - Chrome", async () => {
    // Connect to the device.
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);
    // Take screenshot of the whole device.
    await device.screenshot({ path: 'device.png' })

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    await page.goto('https://id.atlassian.com/login?application');
    console.log(await page.evaluate(() => window.location.href));
    await page.screenshot({ path: 'page.png' });

    await page.fill('[id="username"]', "nimmakayaladhanu@gmail.com");
    await page.click('[id="login-submit"]')
    await page.fill('[id="password"]', "Dhanendra@123")
    await page.click('[id="login-submit"]')

    // await page.fill("a[role='button']");
    // await page.click("text=Log in");
    // // Click input[name="email"]
    // await page.click('input[name="email"]');
    // // Fill input[name="email"]
    // await page.fill('input[name="email"]', 'koushik350@gmail.com');
    // // Press Tab
    // await page.press('input[name="email"]', 'Tab');
    // // Fill input[name="password"]
    // await page.fill('input[name="password"]', 'Pass123$');
    // // Click //button[normalize-space(.)='LOGIN']
    // await Promise.all([
    //     page.waitForNavigation({ url: 'https://letcode.in/' }),
    //     page.click('//button[normalize-space(.)=\'LOGIN\']')
    // ]);
    // await page.click("a[role='button']");
    // await page.click("text=Sign out");

    // Close context and device.
    await context.close();
    await device.close();
});
