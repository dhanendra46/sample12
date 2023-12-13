/**
 * Subscription Product PDP - Verify frequency display and selection
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { BestSellerPage } = require("../../page-objects/best-seller-page")
const { LogGenerator } = require("../../utils/log-generator")
const testdata = require("../../fixtures/test-data.json")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")
const { GiftSetsPage } = require("../../page-objects/gift-sets-page")


var page, context, homePage, bestSellerPage, productDetailsPage, logGenerator, mediumTimeout, giftSetsPage, productTitle
test.describe.configure({ mode: 'serial' });

test.describe("subscription Product pdp -> verify frequency display and selection", () => {

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

    test("launch the application and open bimonthly product, verify", async () => {
        await homePage.launchUrl(testdata.biMonthly)
        await homePage.verifyUrl(testdata.biMonthly)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.closeDiscountPopup()
        await productDetailsPage.verifyAddCartButtonIsDisplayed()
        logGenerator.customLogger("verified add cart button is displayed")
        const termsSubscription = await productDetailsPage.verifySubscriptionTerms()
        expect(termsSubscription[0]).toEqual(testdata.BoxBiMonthly)
        expect(termsSubscription[1]).toEqual(testdata.monthly3Boxes)
        logGenerator.customLogger("verified bimonthly terms is displayed")
    })

    test("launch the application and open biweekly product, verify", async () => {
        await homePage.launchUrl(testdata.biWeekly)
        await homePage.verifyUrl(testdata.biWeekly)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await productDetailsPage.verifyAddCartButtonIsDisplayed()
        logGenerator.customLogger("verified add cart button is displayed")
        const termsSubscription = await productDetailsPage.verifySubscriptionTerms()
        expect(termsSubscription[0]).toEqual(testdata.boxoneEveryTwoWeeks)
        expect(termsSubscription[1]).toEqual(testdata.boxTwoEveryFourWeeks)
        logGenerator.customLogger("verified biweekly terms is displayed")
    })

    test("launch the application and open quaterly product, verify", async () => {
        await homePage.launchUrl(testdata.quaterly)
        await homePage.verifyUrl(testdata.quaterly)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await productDetailsPage.verifyAddCartButtonIsDisplayed()
        logGenerator.customLogger("verified add cart button is displayed")
        const termsSubscription = await productDetailsPage.verifySubscriptionTerms()
        expect(termsSubscription[0]).toEqual(testdata.boxOneEveryThreeMonths)
        expect(termsSubscription[1]).toEqual(testdata.boxTwoEverySixMonths)
        logGenerator.customLogger("verified quaterly terms is displayed")
    })

    test("launch the application and open monthly product, verify", async () => {
        await homePage.launchUrl(testdata.monthly)
        await homePage.verifyUrl(testdata.monthly)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await productDetailsPage.verifyAddCartButtonIsDisplayed()
        logGenerator.customLogger("verified add cart button is displayed")
        const termsSubscription = await productDetailsPage.verifySubscriptionTerms()
        expect(termsSubscription[0]).toEqual(testdata.month1)
        expect(termsSubscription[1]).toEqual(testdata.month3)
        expect(termsSubscription[2]).toEqual(testdata.month6)
        expect(termsSubscription[3]).toEqual(testdata.month12)
        logGenerator.customLogger("verified monthly terms is displayed")
    })

    test("launch the application and open weekly product, verify", async () => {
        await homePage.launchUrl(testdata.weekly)
        await homePage.verifyUrl(testdata.weekly)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await productDetailsPage.verifyAddCartButtonIsDisplayed()
        const termsSubscription = await productDetailsPage.verifySubscriptionTerms()
        expect(termsSubscription[0]).toEqual(testdata.boxOneEveryWeeks)
        expect(termsSubscription[1]).toEqual(testdata.boxtwoEveryTwoWeeks)
        logGenerator.customLogger("verified weekly terms is displayed")

    })
})