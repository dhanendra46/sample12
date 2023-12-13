const { expect } = require("@playwright/test")

var productTitle
class CheckoutPage {
    constructor(page) {
        this.page = page
        this.checkOutpageHeader = this.page.locator('h2#main-header')
        this.productPrice = this.page.locator('//*[text()="Subtotal"]/..//span').nth(0)
        this.productTitleInCheckoutPage = this.page.locator('[class*="product__description__name"]')
        this.emailInputField = this.page.locator('#checkout_email')
        this.firstNameField = this.page.locator('[placeholder="First name"]')
        this.lastNameField = this.page.locator('[placeholder="Last name"]')
        this.addressInputField = this.page.locator('[placeholder="Address"]')
        this.selectUSAAddressOptionInList = this.page.locator('#checkout_shipping_address_address1-autocomplete div')
        this.continueToShippingButton = this.page.locator('#continue_button')
        this.shippingFreeText = this.page.locator('.content-box__emphasis')
        this.getMailtext = this.page.locator('.review-block bdo')
        this.couponTag = this.page.locator('.tag')
        this.getDiscountPriceInProductLine = this.page.locator('.product__description .reduction-code__text')
        this.selectCountryOption = this.page.locator('#checkout_shipping_address_country')
        this.getShippementPrice = this.page.locator('//*[text()="Shipping"]/../..//td//span')
        this.shippingAddressChangeButton = this.page.locator('//*[normalize-space(text())="Ship to"]/../..//a')
        this.getCouponesTag = this.page.locator('.tag .reduction-code__text')
        this.getTermInCheckoutPage = this.page.locator('[class$="total-line--recurring-total"] td span')
        this.productPriceText = this.page.locator('//*[text()="Subtotal"]/..//span').nth(1)
        this.taxesAnFeesQuestionsMark = this.page.locator('//*[text()="Taxes & fees"]/..//*[@role="presentation"]')
        this.serviceFeeAmount = this.page.locator('//*[@id="tooltip-for-taxes-and-fees"]//td')
        this.productsCount = this.page.locator('//*[contains(@class,"product__description__selling_plan")]/../..')
        this.taxesFeeAmount = this.page.locator("//*[text()='Taxes']/following-sibling::td")
        this.checkoutReductionCodeInput = this.page.locator('#checkout_reduction_code')
        this.couponSubmitButton = this.page.locator("#checkout_submit")
        this.removeCouponTagButton = this.page.locator('#checkout_clear_discount+button .icon-svg')
        this.freeShippingText = this.page.locator('.total-line--shipping .total-line__price span')
        this.firstNameInputFieldErrorMessage = this.page.locator('#error-for-first_name')
        this.emailErrorInputFieldMessage = this.page.locator('#error-for-email')
        this.lastNameInputFieldErrorMessage = this.page.locator('#error-for-last_name')
        this.addressInputFieldErrorMessage = this.page.locator('#error-for-address1')
        this.cityInputFieldErrorMessage = this.page.locator("#error-for-city")
        this.stateSelectFieldErrorMessage = this.page.locator('#error-for-province')
        this.zipCodeInputFieldErrorMessage = this.page.locator('#error-for-zip')
        this.noShippingRatesFoundText = this.page.locator('.content-box p')
        this.errorMessageForOutsideUsAddress = this.page.locator('.notice__content p')
        this.errorMessageForCoupon = this.page.locator('p.notice__text')
        this.standAmountPrice = this.page.locator('div .content-box__emphasis')
        this.mediumTimeOut = 5000
        this.lowTimeout = 2000
    }

    async verifyCheckOutPageHeader() {
        await expect(this.checkOutpageHeader).toBeVisible()
    }

    async getCheckoutSubtotalPrice() {
        const productPrice = await this.productPrice.textContent()
        return productPrice.replace(/\$/g, '')
    }

    async getAddOnsProductTtileInCheckoutPage() {
        return this.productTitleInCheckoutPage.nth(0).innerText()
    }

    async getProductTtileInCheckoutPage() {
        return this.productTitleInCheckoutPage.nth(2).innerText()
    }

    async enterEmail(email) {
        await this.emailInputField.fill(email)
    }

    async verifyEmailFieldIsNotEmpty() {
        await expect(this.emailInputField).not.toBeEmpty()
    }

    async verifyFirstNameFieldIsNotEmpty() {
        await expect(this.firstNameField).not.toBeEmpty()
    }

    async enterFirstName(firstName) {
        await this.firstNameField.fill(firstName)
    }

    async enterLastName(lastName) {
        await this.lastNameField.fill(lastName)
    }

    async verifyLastNameFieldIsNotEmpty() {
        await expect(this.lastNameField).not.toBeEmpty()
    }

    async selectAddress(address) {
        await this.addressInputField.fill(address)
        await this.page.waitForTimeout(this.mediumTimeOut)
        await this.page.keyboard.press('ArrowDown')
        await this.page.waitForTimeout(this.mediumTimeOut)
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(this.mediumTimeOut)
    }

    async clickContinueToShipping() {
        await this.continueToShippingButton.click()
    }

    async verifyShippingIsFree() {
        await expect(this.shippingFreeText.nth(0)).toContainText(/Free/)
    }

    async getMailText() {
        return this.getMailtext.innerText()
    }

    async verifyCouponIsDisplayedInCheckoutPage() {
        await expect(this.couponTag).toBeVisible()
    }

    async getDiscountPriceInProductLines() {
        const priceInProductLine = await this.getDiscountPriceInProductLine.nth(1).innerText()
        const match = priceInProductLine.match(/-\$([\d.]+)/);
        return match ? parseFloat(match[1]) : null;
    }

    async refresh() {
        await this.page.reload('load')
        await this.page.waitForTimeout(this.lowTimeout)
    }

    async selectCountry(country) {
        await this.selectCountryOption.selectOption(country)
    }

    async getShippingPrice() {
        const shippingPrice = await this.getShippementPrice.innerText()
        return shippingPrice.replace(/\$/g, '')
    }

    async getCheckoutPrice() {
        const productPrice = await this.productPriceText.textContent()
        return productPrice.replace(/\$/g, '')
    }

    async clickChangeAddress() {
        await this.shippingAddressChangeButton.click()
    }

    async getCouponesTagText() {
        return this.getCouponesTag.innerText()
    }

    async getTermMonthInCheckoutPage() {
        const term = await this.getTermInCheckoutPage.innerText()
        const month = term.split("every")[1];
        const monthText = month.replace(/s/g, '')
        return monthText.trim()
    }

    async mouseHoverOnTaxesAndFeesOption() {
        await this.taxesAnFeesQuestionsMark.hover()
        await this.page.waitForTimeout(2000)
    }

    async getServiceAmont() {
        const service = await this.serviceFeeAmount.nth(1).innerText()
        return service.replace(/\$/g, '')
    }

    async getTaxAmont() {
        const service = await this.taxesFeeAmount.innerText()
        return service.replace(/\$/g, '')
    }

    async verifyMutipleItemsIsDisplayedInCheckoutPage() {
        const elements = await this.page.$$('[class*="product__description__name"]')
        const getProductTitle = []
        const title = getProductTitle

        for (const element of elements) {
            const productTitleText = await element.innerText()
            getProductTitle.push(productTitleText)
        }
        return title
    }

    async getCountOfProducts() {
        const countOfProducts = await this.productsCount.count()
        return countOfProducts
    }

    async getIndividualProductPriceInCheckoutPage() {
        const elements = await this.page.$$('//*[contains(@class,"product__price")]//span')
        const getIndividualProductPrice = []
        const productPrice = getIndividualProductPrice

        for (const element of elements) {
            const productTitleText = await element.innerText()
            const productTitle = await productTitleText.replace(/\$/g, '')
            getIndividualProductPrice.push(productTitle)
        }
        return productPrice
    }

    async enterCouponCode(coupon) {
        await this.checkoutReductionCodeInput.fill(coupon)
    }

    async clickApplyButton() {
        await this.couponSubmitButton.click()
    }

    async couponsPercentage(coupon1, coupon2) {
        couponsDiscount = await page.evaluate(() => {
            return [coupon1, coupon2];
        });
    }

    async removeCouponTag() {
        await this.removeCouponTagButton.dblclick()
        await this.page.waitForSelector('#checkout_clear_discount+button .icon-svg', { state: 'hidden' })
    }

    async navigateToBackPage() {
        if (!this.page.isClosed()) {
            await this.page.goBack({ waitUntil: 'networkidle' });
        } else {
            console.error('Error: Page is closed. Cannot navigate back.');
        }
    }

    async verifyFreeShippingTextIsDisplayed() {
        await expect(this.freeShippingText).toHaveText(/Free/)
    }

    async clickRemoveTag() {
        await this.page.evaluate(() => {
            const hiddenElement = document.querySelector('button.tag__button');
            if (hiddenElement) {
                hiddenElement.click();
            } else {
                console.error('Hidden element not found.');
            }
        })
    }

    async verifyValidateErrorMessageIsDisplayedInCheckoutPage() {
        await expect(this.firstNameInputFieldErrorMessage).toBeVisible()
        await expect(this.emailErrorInputFieldMessage).toBeVisible()
        await expect(this.lastNameInputFieldErrorMessage).toBeVisible()
        await expect(this.addressInputFieldErrorMessage).toBeVisible()
        await expect(this.cityInputFieldErrorMessage).toBeVisible()
        await expect(this.stateSelectFieldErrorMessage).toBeVisible()
        await expect(this.zipCodeInputFieldErrorMessage).toBeVisible()
    }

    async verifyNoShippingRatesFoundForThisAddressIsDisplayed(noShippingText) {
        await expect(this.noShippingRatesFoundText).toHaveText(noShippingText)
    }

    async verifyOutsideUsAddressErrorMessageIsDisplayed() {
        await expect(this.errorMessageForOutsideUsAddress).toBeVisible()
    }

    async verifyerrorMessageForCouponIsDisplayed() {
        await expect(this.errorMessageForCoupon).toBeVisible()
    }

    async getStandedAmount() {
        const shippingAmount = await this.standAmountPrice.innerText()
        const shippingPrice = shippingAmount.replace(/\$/g, '')
        return shippingPrice
    }

    async getIndividualProductShippmentPrice() {
        const elements = await this.page.$$('.emphasis+p')
        const getIndividualProductShippment = []
        const productPrice = getIndividualProductShippment

        for (const element of elements) {
            const productShippingPrice = await element.innerText()
            const productTitle = await productShippingPrice.match(/\$(\d+\.\d+)/)
            const exactPrice = productTitle ? productTitle[1] : null
            getIndividualProductShippment.push(exactPrice)
        }
        return productPrice
    }
}

module.exports = { CheckoutPage }