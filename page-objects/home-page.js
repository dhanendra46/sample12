const { expect } = require("@playwright/test")

class HomePage {
    constructor(page) {
        this.page = page
        this.crateJoyLogo = this.page.locator('#utility .logo svg').nth(1)
        this.closeDialogButton = this.page.getByRole('button', { name: 'Close dialog 1' })
        this.searchInputField = this.page.locator("#search")
        this.noResultsFoundText = this.page.locator('#searchpage-nosto-results div div>div')
        this.couponesLink = this.page.locator('//*[@id="utility"]//*[normalize-space(text())="Coupons"]')
        this.collectionsHeader = this.page.locator("h1.heading")
        this.cartIcon = this.page.locator('[aria-label="Toggle shopping cart"]')
        this.mediumTimeout = 5000
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

    async clickOnLinkedCollection(navigatePage) {
        const bestSeller = await this.page.locator('.header a:has-text("' + navigatePage + '")')
        await bestSeller.click()
    }

    async closeDiscountPopup() {
        await this.closeDialogButton.click()
    }

    async closeDialogpopup() {
        if(await this.closeDialogButton.isVisible()) {
            await this.closeDialogButton.click()
        }
    }

    async searchForProduct(product) {
        await this.searchInputField.fill(product)
        await this.page.keyboard.press("Enter")
        await this.page.waitForTimeout(this.mediumTimeout)
    }

    async verifyNoResultsFoundTextIsDisplayed() {
        await expect(this.noResultsFoundText).toHaveText(/No results found for/)
    }

    async clickCouponesLink() {
        await this.couponesLink.click()
    }

    async verifyCollectionHeaderIsDisplayed(collectionHeaderName) {
        await expect(this.collectionsHeader).toContainText(collectionHeaderName)
    }

    async clickCartIcon() {
        await this.cartIcon.click()
    }
}

module.exports = { HomePage }