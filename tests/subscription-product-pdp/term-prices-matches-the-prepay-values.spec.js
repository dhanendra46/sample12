/**
 * subscription product pdp - Term prices matches the prepay values
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


var page, context, productPriceInDetailsPage, productPriceInCartPage, productPriceInCheckoutPage, cartPageProductPrice, checkoutPageProductPrice, homePage, bestSellerPage, productDetailsPage,
    cartPage, checkoutPage, logGenerator, productTitle, giftSetsPage, lowerTimeout
test.describe.configure({ mode: 'serial' });
lowerTimeout = 2000

test.describe("subscription product pdp -> term prices matches the prepay values", () => {

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
        logGenerator = new LogGenerator(page)
        giftSetsPage = new GiftSetsPage(page)
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

    test("select subscription and get price", async () => {
        await productDetailsPage.selectSubscription(testdata.month1)
        productPriceInDetailsPage = await productDetailsPage.getProductDetailsPagePrice()
        logGenerator.customLogger("product price is captured from product details page")
    })

    test("add product to cart and verify product price", async () => {
        await productDetailsPage.clickAddToCard()
        logGenerator.customLogger("product is added to the cart")
        await cartPage.verifyShoppingCartHeader()
        await page.waitForTimeout(lowerTimeout)
        productPriceInCartPage = await cartPage.getCartPageProductPrice()
        expect(await productPriceInDetailsPage).toEqual(productPriceInCartPage)
        logGenerator.customLogger("product price on details page is matched with cart page price")
    })

    test("go to secure checkout and verify the price", async () => {
        await cartPage.clickSecureCheckout()
        await checkoutPage.verifyCheckOutPageHeader()
        logGenerator.customLogger("checkout page is opened successfully")
        productPriceInCheckoutPage = await checkoutPage.getCheckoutSubtotalPrice()
        expect(await productPriceInCartPage).toEqual(productPriceInCheckoutPage)
        logGenerator.customLogger("product price on cart page is matched with checkout page price")
        logGenerator.customLogger("Test execution ended!")
    })
})