/**
 * Subscription Product PDP - Verify no dead links exist
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { LogGenerator } = require("../../utils/log-generator")
const testdata = require("../../fixtures/test-data.json")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")
const { GiftSetsPage } = require("../../page-objects/gift-sets-page")


var page, context, homePage, bestSellerPage, productDetailsPage, logGenerator, giftSetsPage, productTitle, mediumTimeout
test.describe.configure({ mode: 'serial' });
mediumTimeout = 5000

test.describe("subscription Product PDP -> verify no dead links exist", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        await page.evaluate(() => {
            Notification.permission = 'denied';
        });
        homePage = new HomePage(page)
        bestSellerPage = new BestSellerPage(page)
        logGenerator = new LogGenerator(page)
        productDetailsPage = new ProductDetailsPage(page)
        giftSetsPage = new GiftSetsPage(page)
        logGenerator.customLogger("Subscription Product pdp-> Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("launch and open every product and verify 404 error pages", async () => {
        test.setTimeout(1600000)
        await homePage.launchUrl(process.env.BEST_SELLER_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.bestSellersUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
        productTitle = await giftSetsPage.getProductTitleInSellerPage()
        await bestSellerPage.selectProductBox(productTitle)
        await page.waitForTimeout(mediumTimeout)
        await productDetailsPage.verifyErrorlinksAreNotDisplayed()
        logGenerator.customLogger("verified dead link is not displayed")
        logGenerator.customLogger("Test execution ended!!!")
    })
})