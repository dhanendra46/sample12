/**
 * Add-Ons - Item successfully added to cart
 */

const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")
const { CartPage } = require("../../page-objects/cart-page")
const { LogGenerator } = require("../../utils/log-generator")
const { GiftSetsPage } = require("../../page-objects/gift-sets-page")
const testdata = require("../../fixtures/test-data.json")

var page, context, homePage, productDetailsPage, productTitle, productTilteInProductDetailPage,
    cartPage, logGenerator, giftSetsPage, addOnsProductTitle, productTitleInCardPage
test.describe.configure({ mode: 'serial' });

test.describe("add-on -> item successfully added to cart", () => {

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

    test("launch and opens the product, verify", async () => {
        await homePage.launchUrl(process.env.BEST_SELLER_URL)
        await homePage.verifyUrl(process.env.BEST_SELLER_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDiscountPopup()
        productTitle = await giftSetsPage.getProductTitle(testdata.theraBox)
        await giftSetsPage.selectProduct(productTitle)
        productTilteInProductDetailPage = await productDetailsPage.getProductTitle()
        expect(await productTitle).toEqual(productTilteInProductDetailPage)
        await productDetailsPage.verifyProductBoxTitle(productTitle)
        logGenerator.customLogger("product name verified")
        await productDetailsPage.verifyAddCartButtonIsDisplayed()
        logGenerator.customLogger("add cart button verified")
    })

    test("add product to cart and verify product title", async () => {
        await productDetailsPage.clickAddToCard()
        expect(await productTitle).toEqual(productTilteInProductDetailPage)
        await cartPage.verifyShoppingCartHeader()
        await cartPage.verifyProductNameInCart(productTilteInProductDetailPage, productTilteInProductDetailPage)
        await cartPage.verifyGiftOptionInCartPage(productTilteInProductDetailPage)
        logGenerator.customLogger("verified gift option in product cart")
    })

    test("select the add-ons product and verify that the product title", async () => {
        await cartPage.verifyAddOnsProducts()
        addOnsProductTitle = await cartPage.getAddOnsProductTitle()
        await cartPage.clickAddToOrder(testdata.addToOrder)
        await cartPage.verifyShoppingCartHeader()
        logGenerator.customLogger("verified cart is open successfully")
        productTitleInCardPage = await cartPage.getProductTitleInCartPage()
        expect(addOnsProductTitle).toEqual(productTitleInCardPage)
        logGenerator.customLogger("add-on product is successfully added to the cart page")
        logGenerator.customLogger("Test execution ended!")
    })
})