const { test, expect } = require("@playwright/test")
const winston = require('winston')
const { HomePage } = require("../page-objects/home-page")
const { BestSellerPage } = require("../page-objects/best-seller-page")
const { LogGenerator } = require("../utils/log-generator")
const testdata = require("../fixtures/test-data.json")
const { ProductDetailsPage } = require("../page-objects/product-details-page")
const { transports } = winston
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new transports.File({ filename: 'combined.log', level: 'debug' })
    ]
})


var page, context, homePage, bestSellerPage, productDetailsPage, logGenerator, email
test.describe.configure({ mode: 'serial' });

test.describe("Batch 1", async () => {
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

        test.only("launch and verify the best seller page", async () => {
            await homePage.launchUrl(process.env.BEST_SELLER_URL)
            logger.debug("this meesages for smaple case condition not working properly ")
            logger.http("https condition")
            logger.verbose("verbase condition")
            logger.info("condition info measured")
            logger.error("error condition seviority")
            console.log("sample code")
        })
    })
})