const { expect } = require("@playwright/test")
const { Page, BrowserContext } = require("playwright");

class HomePage {
    constructor(page, context) {
        this.page = page;
        this.context = context;
      }


    async launchUrl(testUrl) {
        await this.page.goto(testUrl)
    }

    async verifyCratejoyLogo() {
        await expect(this.crateJoyLogo).toBeVisible()
    }

    async verifyUrl(url) {
        await expect(this.page).toHaveURL(url)
    }
}

module.exports = { HomePage }