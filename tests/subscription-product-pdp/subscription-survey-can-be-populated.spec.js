/**
 * Subscription product - Subscription Survey can be populated
 */

const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")
const { CartPage } = require("../../page-objects/cart-page")
const { LogGenerator } = require("../../utils/log-generator")
const { GiftSetsPage } = require("../../page-objects/gift-sets-page")
const testdata = require("../../fixtures/test-data.json")

var page, context, homePage, productDetailsPage, productTilteInProductDetailPage,
    cartPage, logGenerator, giftSetsPage, productTitleInCartPage
test.describe.configure({ mode: 'serial' });

test.describe("subscription product  -> subscription Survey can be populated", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        await page.evaluate(() => {
            Notification.permission = 'denied';
        });
        homePage = new HomePage(page)
        productDetailsPage = new ProductDetailsPage(page)
        cartPage = new CartPage(page)
        logGenerator = new LogGenerator(page)
        giftSetsPage = new GiftSetsPage(page)
        logGenerator.customLogger("Add-ons-->Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("select personalization and verify", async () => {
        await homePage.launchUrl(testdata.celebrateState)
        await homePage.closeDiscountPopup()
        await productDetailsPage.verifyPersonalizationHeaderIsDisplayed()
        logGenerator.customLogger("verifyed personalization header is Displayed")
        await productDetailsPage.clickAddPersonalizationButton()
        await productDetailsPage.verifyPersonalizationSubscriptionPopupIsDisplayed()
        logGenerator.customLogger("verifyed personalization subscription popup is Displayed")
        await productDetailsPage.clickDone()
        await productDetailsPage.clickAddToCard()
        await productDetailsPage.verifyPersonalizationCheckmarkIsDisplayed()
        logGenerator.customLogger("verifyed personalized checkmark is Displayed ")
        await cartPage.verifyShoppingCartHeader()
        logGenerator.customLogger("product is added to the cart")
        logGenerator.customLogger("test execution ended!")
    })
})