// tests/spec.js

const { test } = require('@playwright/test');

test('Example test 1', async ({ page }) => {
  // Your test logic here
  //await page.goto('https://www.example.com');
  await page.waitForSelector('h1');
});

test('Example test 2', async ({ page }) => {
  // Your test logic here
  await page.goto('https://www.example.com');
  await page.waitForSelector('.nonexistent-element', { timeout: 5000 });
});

test('Example test 3', async ({ page }) => {
  // Your test logic here
  await page.goto('https://www.example.com');
  await page.waitForSelector('h2');
});
