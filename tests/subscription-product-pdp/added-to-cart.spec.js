/**
 * Item successfully added to cart
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
    cartPage, checkoutPage, logGenerator, productTilteInProductDetailPage
test.describe.configure({ mode: 'serial' });

test.describe("subscription product pdp -> item successfully added to cart", () => {

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

    test("launch and verify the best seller page", async () => {
        await homePage.launchUrl(process.env.BEST_SELLER_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.bestSellersUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
    })

    test("select and verify that the product is opened", async () => {
        productTitle = await giftSetsPage.getProductTitleInSellerPage()
        await bestSellerPage.selectProductBox(productTitle)
        productTilteInProductDetailPage = await productDetailsPage.getProductTitle()
        expect(await productTitle).toEqual(productTilteInProductDetailPage)
        await productDetailsPage.verifyProductBoxTitle(productTilteInProductDetailPage)
        logGenerator.customLogger("1st product selected and product details page is opened successfully")
        await productDetailsPage.selectSubscription(testdata.month1)
        await productDetailsPage.verifySubscriptionIsChecked(testdata.month1)
        logGenerator.customLogger("selected month is verified")
    })

    test("add a product to the cart and verify the product title", async () => {
        await productDetailsPage.clickAddToCard()
        logGenerator.customLogger("product is added to the cart")
        await cartPage.verifyShoppingCartHeader()
        expect(await productTitle).toEqual(productTilteInProductDetailPage)
        await cartPage.verifyProductNameInCart(productTilteInProductDetailPage, productTilteInProductDetailPage)
        await cartPage.verifyGiftOptionInCartPage(productTilteInProductDetailPage)
        logGenerator.customLogger("product title verifired in cart page")
        await cartPage.clickGiftOption(productTilteInProductDetailPage)
        await cartPage.verifyGiftOptionIsUnchecked()
        logGenerator.customLogger("verify gift option is unchecked")
        logGenerator.customLogger("product is added to the cart")
        logGenerator.customLogger("Test execution ended!")
    })
})