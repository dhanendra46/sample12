/**
 * Sold Out Product PDP - 'Sold Out' label is visible
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { LogGenerator } = require("../../utils/log-generator")
const testdata = require("../../fixtures/test-data.json")


var page, context, homePage, bestSellerPage,
    cartPage, logGenerator
test.describe.configure({ mode: 'serial' });

test.describe("sold out product pdp -> sold out label is visible", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        await page.evaluate(() => {
            Notification.permission = 'denied';
        });
        homePage = new HomePage(page)
        bestSellerPage = new BestSellerPage(page)
        logGenerator = new LogGenerator(page)
        logGenerator.customLogger("Sold out product pdp -> Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("launch and verify the best seller page", async () => {
        await homePage.launchUrl(process.env.BEST_SELLER_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.bestSellersUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
    })

    test("verify sold out label display in collections", async () => {
        await bestSellerPage.verifySoldOutLabelIsDisplayed()
        logGenerator.customLogger("verified sold out product in collections")
        logGenerator.customLogger("Test execution ended!")
    })
})