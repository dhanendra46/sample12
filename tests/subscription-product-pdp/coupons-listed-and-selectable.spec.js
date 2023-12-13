/**
 * subscription product pdp - Up to two Coupons listed and selectable & not duplicate coupons
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


var page, context, homePage, bestSellerPage, productDetailsPage, productTitle, giftSetsPage,
cartPage, checkoutPage, logGenerator
test.describe.configure({ mode: 'serial' });

test.describe("subscription product pdp -> up to two coupons listed and selectable & not duplicate coupons", () => {

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

    test("select and verify the first product is opened", async () => {
        productTitle = await giftSetsPage.getProductTitleInSellerPage()
        await bestSellerPage.selectProductBox(productTitle)
        await productDetailsPage.verifyProductBoxTitle(productTitle)
        logGenerator.customLogger("1st product selected and product details page is opened successfully")
    })

    test("verify that the coupons list is selectable and does not contain duplicates", async () => {
        await productDetailsPage.verifyThatCouponsAreNotDuplicateAndSelectable()
        logGenerator.customLogger("coupones verified not duplicate and selectble")
        logGenerator.customLogger("test execution ended!")
    })
})