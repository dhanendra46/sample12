/**
 * Sold Out Product PDP - Should be able to add email to waitlist
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { LogGenerator } = require("../../utils/log-generator")
const testdata = require("../../fixtures/test-data.json")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")


var page, context, homePage, bestSellerPage, productDetailsPage,
    cartPage, logGenerator, email
test.describe.configure({ mode: 'serial' });
const random = Math.random().toString(36).substring(2, 7);
email = "suresh" + random + "@gmail.com"

test.describe("sold out product pdp -> should be able to add email to waitlist", () => {

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
        logGenerator.customLogger("Community page pdp -> Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("launch and verify the best seller page", async () => {
        //await homePage.launchUrl(process.env.BEST_SELLER_URL)
        //logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.bestSellersUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
    })

    test("verify sold out label display in collections", async () => {
        await bestSellerPage.clickOnSoldOutProduct()
        await productDetailsPage.enterEmail(email)
        await productDetailsPage.clickNotifymeWhenAvailable()
        await productDetailsPage.verifyAddListTextIsDisplayed()
        logGenerator.customLogger("verified add list text is displayed")
        logGenerator.customLogger("Test execution ended!")
    })
})