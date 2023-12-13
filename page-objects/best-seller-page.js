const { expect } = require("@playwright/test")
class BestSellerPage {
    constructor(page) {
        this.page = page
        this.collectionPageHeader = this.page.locator("h1.heading")
        this.communityProductText = this.page.locator('//*[text()="Knit-Wise Monthly"]')
        this.pageNextButton = this.page.locator('//*[normalize-space(text())="Next"]')
        this.soldOutLabelText = this.page.locator('//*[contains(@class,"app--listing-card-flair-tag--sold-out")]/..').nth(0)
        this.addCardButton = this.page.locator('#add-to-cart')
        this.productTitleInBestSellerPage = this.page.locator('.app--listing-card a')
        this.addOnsCard = this.page.locator('#cart-addons')
        this.removeProduct = this.page.locator('//*[normalize-space(text())="Remove"]')
        this.emptyCartHeader = this.page.locator('#cart-drawer-empty')
        this.lowerTimeout = 2000
        this.mediumTimeout = 6000
        this.waitForCartAdon = '#cart-addons'
        this.waitForRemoveLocator = '//*[normalize-space(text())="Remove"]'
    }

    async selectProductBox(productBoxName) {
        await this.page.waitForTimeout(this.mediumTimeout)
        await this.page.getByRole('link', { name: `${productBoxName}` }).nth(0).click()
    }

    async verifyCollectionPageHeader(headerText) {
        await expect(this.collectionPageHeader).toContainText(headerText)
    }

    async verifyCommunityProductIsNotDisplayed() {
        var i = 1
        while (i > 0) {
            if (await this.communityProductText.isVisible()) {
                await expect(this.communityProductText).not.toBeVisible()
                break
            }
            else if (await this.pageNextButton.isVisible()) {
                await this.pageNextButton.click()
                i++
            }

            else if (!await this.pageNextButton.isVisible()) {
                break
            }
        }
        i++;
    }


    async verifySoldOutLabelIsDisplayed() {
        var i = 1
        while (i > 0) {
            if (await this.soldOutLabelText.isVisible()) {
                await this.soldOutLabelText.click()
                await expect(this.addCardButton).not.toBeVisible()
                break
            }
            else if (await this.pageNextButton.isVisible()) {
                await this.pageNextButton.click()
            }

            else {
                break
            }
        }
        i++;
    }

    async verifyAddCartButonNotDisplayed() {
        await expect(this.addCardButton).not.toBeVisible()
    }


    async clickOnSoldOutProduct() {
        var i = 1
        while (i > 0) {
            if (await this.soldOutLabelText.isVisible()) {
                await this.soldOutLabelText.click()
                await expect(this.addCardButton).not.toBeVisible()
                break
            }
            else if (await this.pageNextButton.isVisible()) await this.pageNextButton.click()
        }
        i++;
    }

    async verifyAddOnsProductsIsDisplayed() {
        var i = 1
        while (i > 0) {
            await this.page.waitForTimeout(this.lowerTimeout)
            if (await this.productTitleInBestSellerPage.nth(i).isVisible()) {
                await this.productTitleInBestSellerPage.nth(i).click()
                await this.addCardButton.click()
                await this.page.waitForTimeout(this.mediumTimeout)
                if (await this.addOnsCard.isVisible()) {
                    await expect(this.addOnsCard).toBeVisible()
                    break
                }
                else {
                    await this.page.waitForSelector(this.waitForRemoveLocator)
                    await this.removeProduct.click()
                    await expect(this.emptyCartHeader).not.toHaveClass('hidden')
                    await this.page.goBack()
                }
            }
            i++
        }
    }
}

module.exports = { BestSellerPage }