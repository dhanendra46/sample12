/**
 * Subscription product - Subscription Survey Required fields are required
 */

const { test, expect } = require("@playwright/test")
const { HomePage } = require("../../page-objects/home-page")
const { ProductDetailsPage } = require("../../page-objects/product-details-page")
const { CartPage } = require("../../page-objects/cart-page")
const { LogGenerator } = require("../../utils/log-generator")
const { GiftSetsPage } = require("../../page-objects/gift-sets-page")
const testdata = require("../../fixtures/test-data.json")

var page, context, homePage, productDetailsPage, productTilteInProductDetailPage, funFacts, celebrationHolidays,
    cartPage, logGenerator, giftSetsPage, productTitleInCartPage, hoomansName, furbabyName, catAllergies, furbabyBirthday

test.describe.configure({ mode: 'serial' });

const random = Math.random().toString(36).substring(2, 7);
hoomansName = "testing" + random
furbabyName = "automation" + random
catAllergies = "suresh" + random
furbabyBirthday = "10/12/2023" + random
funFacts = "sureshsalloju" + random
celebrationHolidays = "23-12-20" + random

test.describe("subscription product  -> Subscription Survey Required fields are required", () => {

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

    test("select required personalization data and verify", async () => {
        await homePage.launchUrl(testdata.whiskerswinebypawsplace)
        await homePage.closeDiscountPopup()
        await productDetailsPage.clickAddToCard()
        await productDetailsPage.verifyPersonalizationHeaderIsDisplayed()
        await productDetailsPage.verifyAddPersonalizationErrorMessageIsDisplayed()
        logGenerator.customLogger("verified personalization error message is Displayed")
        await productDetailsPage.clickAddPersonalizationButton()
        await productDetailsPage.verifyPersonalizationSubscriptionPopupIsDisplayed()
        logGenerator.customLogger("verified personalization subscription popup Displayed")
        await productDetailsPage.fillRequiredFiledInPersonalizationSubscription(testdata.hoomansName, hoomansName)
        await productDetailsPage.fillRequiredFiledInPersonalizationSubscription(testdata.furbabysName, furbabyName)
        await productDetailsPage.fillRequiredFiledInPersonalizationSubscription(testdata.hoomanCatAllergies, catAllergies)
        await productDetailsPage.fillRequiredFiledInPersonalizationSubscription(testdata.furbabysBirthdayGotchaDay, furbabyBirthday)
        await productDetailsPage.fillRequiredTextInPersonalizationSubscription(testdata.funFactsMoreaboutyou, funFacts)
        await productDetailsPage.fillRequiredTextInPersonalizationSubscription(testdata.celebrateHolidayInDecember, celebrationHolidays)
        logGenerator.customLogger("filled personalization subscription details")
        await productDetailsPage.clickDone()
        await productDetailsPage.clickAddToCard()
        await productDetailsPage.verifyPersonalizationCheckmarkIsDisplayed()
        logGenerator.customLogger("verified personalized checkmark is Displayed")
        await cartPage.verifyShoppingCartHeader()
        logGenerator.customLogger("product is added to the cart")
        logGenerator.customLogger("test execution ended!")
    })
})