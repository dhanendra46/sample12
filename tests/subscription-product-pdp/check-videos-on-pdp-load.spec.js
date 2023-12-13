/**
 * Subscription Product PDP - Check videos on PDP load
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { LogGenerator } = require("../../utils/log-generator")
const testdata = require("../../fixtures/test-data.json")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")


var page, context, homePage, bestSellerPage, productDetailsPage, logGenerator, mediumTimeout
test.describe.configure({ mode: 'serial' });
mediumTimeout = 5000

test.describe("subscription Product pdp -> check videos on pdp load", () => {

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
        logGenerator.customLogger("Subscription Product pdp-> Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("launch the application, open a product, and verify the video play or not", async () => {
        test.setTimeout(60000)
        await homePage.launchUrl(process.env.BEST_SELLER_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.bestSellersUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            productDetailsPage.clickOnVideoPlayButton()
        ])
        productDetailsPage = new ProductDetailsPage(newPage)
        await newPage.waitForTimeout(mediumTimeout)
        await productDetailsPage.verifyVideoPause()
        await productDetailsPage.verifyVideoPlay()
        logGenerator.customLogger("verified video played successfully in youtube")
        await newPage.close()
        productDetailsPage = new ProductDetailsPage(page)
        logGenerator.customLogger("Test execution ended!!!")
    })
})