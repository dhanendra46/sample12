const { expect } = require("@playwright/test")

var coupone1, getProductPrice

class GiftSetsPage {
    constructor(page) {
        this.page = page
        this.productTitleInGiftPage = this.page.locator('.group.flex .text-lg').nth(0)
        this.productTitleInBestSellerPage = this.page.locator('.app--listing-card a')
        this.counponesList = this.page.locator('.discount-label').nth(0)
        this.couponesRadioButton = this.page.locator('#pdp-coupon-picker [type="radio"]').nth(0)
        this.selectSubscriptions = this.page.locator(".term-label span")
        this.soldLabel = this.page.locator('//*[text()="Sold Out"]')
        this.lowerTimeout = 2000
        this.mediumTimeout = 5000
    }

    async selectProduct(productBoxName) {
        await this.page.waitForTimeout(this.lowerTimeout)
        await this.page.getByRole('link', { name: `${productBoxName}` }).nth(0).click()
    }

    async getProductTitle(title) {
        await this.page.waitForTimeout(this.lowerTimeout)
        const productTitle = await this.page.locator('//*[text()="' + title + '"]').nth(0)
        return productTitle.textContent()
    }

    async getProductTitlesInGiftPage() {
        return this.productTitleInGiftPage.innerText()
    }

    async getProductTitleInSellerPage() {
        return this.productTitleInBestSellerPage.nth(0).innerText()
    }

    async clickOnCouponsCodeProduct() {
        var i = 1
        while (i > 0) {
            await this.page.waitForTimeout(this.lowerTimeout)
            if (await this.productTitleInBestSellerPage.nth(i).isVisible()) {
                await this.productTitleInBestSellerPage.nth(i).click()
                await this.page.waitForTimeout(this.lowerTimeout)
                if (await this.counponesList.isVisible()) {
                    coupone1 = await this.counponesList.textContent()
                    await this.counponesList.click()
                    expect(await this.couponesRadioButton).toBeChecked()
                    await this.page.waitForTimeout(this.mediumTimeout)
                    break
                }

                else {
                    await this.page.waitForTimeout(this.mediumTimeout)
                    await this.page.goBack()
                }
            }
            i++;
        }

        const matchResult1 = coupone1.match(/(\d+)% off/);
        const couponPercentage = matchResult1 ? matchResult1[1] : null;

        const regex = /code\s(.*?)\sfor/;
        const matchResult = coupone1.match(regex);
        const couponName = matchResult ? matchResult[1] : null;
        return [couponPercentage, couponName]
    }

    async getAnotherProductTitleInSellerPage() {
        return this.productTitleInBestSellerPage.nth(1).innerText()
    }

    async verifySoldOutLableIsNotDisplayed() {
        await expect(this.soldLabel).not.toBeVisible()
    }
}

module.exports = { GiftSetsPage }