/**
 * subscription product pdp - Subscription Variants can be chosen
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")
const { CartPage } = require("../../page-objects/cart-page")
const { CheckoutPage } = require("../../page-objects/checkout-page")
const { LogGenerator } = require("../../utils/log-generator")
const { GiftSetsPage } = require("../../page-objects/gift-sets-page")
const testdata = require("../../fixtures/test-data.json")


var page, context, cartPage, checkoutPage, logGenerator, homePage, productDetailsPage,
    bestSellerPage, productTitle, giftSetsPage
test.describe.configure({ mode: 'serial' });

test.describe("Subscription product pdp -> subscription Variants can be chosen", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        await page.evaluate(() => {
            Notification.permission = 'denied';
        });
        homePage = new HomePage(page)
        bestSellerPage = new BestSellerPage(page)
        productDetailsPage = new ProductDetailsPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        giftSetsPage = new GiftSetsPage(page)
        logGenerator = new LogGenerator(page)
        logGenerator.customLogger("Test execution started....")
    })

    test.afterAll(async () => {
        await page.close()
    })

    test("launch and verify the best seller application", async () => {
        await homePage.launchUrl(process.env.BEST_SELLER_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.bestSellersUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
    })

    test("select and verify first product is opened", async () => {
        productTitle = await giftSetsPage.getProductTitleInSellerPage()
        await bestSellerPage.selectProductBox(productTitle)
        await productDetailsPage.verifyProductBoxTitle(productTitle)
        logGenerator.customLogger("1st product selected and product details page is opened successfully")
    })

    test("select variants subscriptions and verify subscription is selected", async () => {
        await productDetailsPage.selectSubscription(testdata.month1)
        await productDetailsPage.verifySubscriptionIsChecked(testdata.month1)
        logGenerator.customLogger("1st month subscription is checked")
        await productDetailsPage.selectSubscription(testdata.month3)
        await productDetailsPage.verifySubscriptionIsChecked(testdata.month3)
        logGenerator.customLogger("3rd month subscription is checked")
        await productDetailsPage.selectSubscription(testdata.month6)
        await productDetailsPage.verifySubscriptionIsChecked(testdata.month6)
        logGenerator.customLogger("6th month subscription is checked")
        await productDetailsPage.selectSubscription(testdata.month12)
        await productDetailsPage.verifySubscriptionIsChecked(testdata.month12)
        logGenerator.customLogger("12th month subscription is checked")
        logGenerator.customLogger("Test execution ended!")
    })
})