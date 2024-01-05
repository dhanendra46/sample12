/**
 * Item successfully added to cart
 */
const { expect } = require("@playwright/test")
const baseTest = require("../../page-objects/sample-obgects-page")

const test = baseTest;

test("launch and verify the best seller page", async ({ homePage }) => {
    await homePage.launchUrl("https://www.youtube.com/watch?v=ELAp41NV13E")
})