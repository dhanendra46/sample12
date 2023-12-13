/**
 * Subscription Product PDP - Verify inventory / Sold out status is respected

 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { LogGenerator } = require("../../utils/log-generator")
const testdata = require("../../fixtures/test-data.json")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")


var page, context, homePage, bestSellerPage,
    cartPage, logGenerator, productDetailsPage
test.describe.configure({ mode: 'serial' });

test.describe("subscription product pdp -> sold out status is respected", () => {

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
        logGenerator.customLogger("Subscription product pdp -> Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("launch and open best seller product and verify sold out label display in collections", async () => {
        await homePage.launchUrl(process.env.BASE_URL)
        await homePage.verifyUrl(process.env.BASE_URL)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.closeDiscountPopup()
        await homePage.clickOnLinkedCollection(testdata.bestSellers)
        await homePage.verifyCollectionHeaderIsDisplayed(testdata.bestSellerHeader)
        logGenerator.customLogger("navigate to best sellect collections")
        await bestSellerPage.verifySoldOutLabelIsDisplayed()
        logGenerator.customLogger("verified add cart button is not displayed for sold out products")
        await productDetailsPage.navigateToBackPage()
    })

    test("open new arrivals collection product and verify sold out label display in collections", async () => {
        test.setTimeout(120000)
        await homePage.clickOnLinkedCollection(testdata.newArrivals)
        await homePage.verifyCollectionHeaderIsDisplayed(testdata.newArrivalsHeader)
        logGenerator.customLogger("navigate to new arrivals collections")
        await bestSellerPage.verifySoldOutLabelIsDisplayed()
        logGenerator.customLogger("verified add cart button is not displayed for sold out products")
        await productDetailsPage.navigateToBackPage()
    })

    test("open as seen in press collection product and verify sold out label display in collections", async () => {
        await homePage.clickOnLinkedCollection(testdata.asSeenInPress)
        await homePage.verifyCollectionHeaderIsDisplayed(testdata.asSeenInPressHeader)
        logGenerator.customLogger("navigate to as seen in press collections")
        await bestSellerPage.verifySoldOutLabelIsDisplayed()
        logGenerator.customLogger("verified add cart button is not displayed for sold out products")
        await productDetailsPage.navigateToBackPage()
    })

    test("open featured on sale collection product and verify sold out label display in collections", async () => {
        await homePage.clickOnLinkedCollection(testdata.featuredOnSale)
        await homePage.verifyCollectionHeaderIsDisplayed(testdata.featuredOnSaleHeader)
        logGenerator.customLogger("navigate to featured on sale collection collections")
        await bestSellerPage.verifySoldOutLabelIsDisplayed()
        logGenerator.customLogger("verified add cart button is not displayed for sold out products")
        logGenerator.customLogger("Test execution ended!")
    })
})