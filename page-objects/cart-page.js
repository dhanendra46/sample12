const { expect } = require("@playwright/test")
const { assign } = require("nodemailer/lib/shared")

class CartPage {
    constructor(page) {
        this.page = page
        this.productboxAmount = this.page.locator('#cart-products div .text-sm')
        this.secureCheckoutButton = this.page.locator('.button--secondary')
        this.shoppingCartHeader = this.page.locator('#cart h4')
        this.thisIsGiftCheckBoxButton = this.page.locator('#gift-is_gift')
        this.emptyCartHeader = this.page.locator('#cart-drawer-empty')
        this.closeCartButton = this.page.locator('.bar .app--cart-close')
        this.subscriptionToggle = this.page.locator('[for="gift-autorenew"]')
        this.giftOptionPageHeader = this.page.locator('#cart h4')
        this.addOnsProductTitle = this.page.locator('.flex-row [class$="self-start"]')
        this.productTilteTextInCart = this.page.locator('#cart-products .cart-item a.text-base')
        this.getSubTotalPriceText = this.page.locator('.actions strong')
        this.addOnsProductHeader = this.page.locator('.glide__slides')
        this.getProductTitleInCart = this.page.locator('.items-start a')
        this.emailGiftMessageCheckBox = this.page.locator('[for="gift-send_gift_note"]')
        this.giftMessageOptions = this.page.locator('#gift-message-options-container')
        this.giftOptionHeader = this.page.locator('#gift-drawer h4')
        this.sendImmediatlyRadioButton = this.page.locator('#gift-send_now')
        this.sendGiftLaterRadioButton = this.page.locator('#gift-send_later')
        this.onSpecificDayRadioButton = this.page.locator('#gift-schedule')
        this.personalizedGiftMessagesInputField = this.page.locator('#gift-gift_message')
        this.recipientNameInputField = this.page.locator("#gift-gift_recipient_name")
        this.recipientEmailInputField = this.page.locator('#gift-gift_recipient_email')
        this.personalizedGiftMessageOptionalText = this.page.locator('[placeholder="Personalized Gift Message (optional)"]')
        this.dateInputField = this.page.locator('#gift-gift_message_send_at')
        this.continueShoppingButton = this.page.locator('.actions .app--cart-close')
        this.cartProductcount = this.page.locator('.cart-item')
        this.getTermTextInCart = this.page.locator('#cart-products .items-center .font-semibold.underline')
        this.calculateCheckOutPageTextInCartPage = this.page.locator('[class^="text-teal"]')
        this.taxShippingDiscountsTextInCartPage = this.page.locator(".actions.relative span")
        this.addonsheading = this.page.locator('strong.text-xs')
        this.addonRightArrow = this.page.locator('button.glide__arrow--right')
        this.addonLeftArrow = this.page.locator('button.glide__arrow--left')
        this.closeButton = this.page.locator('.app--cart-close')
        this.addToOrderButton = this.page.locator('//*[normalize-space(text())="Add to Order"]')
        this.mediumTimeOut = 5000
    }

    async getCartPageProductPrice() {
        const cartPageProductPrice = await this.productboxAmount.innerText()
        return cartPageProductPrice.replace(/\$/g, '')
    }

    async clickSecureCheckout() {
        await this.page.getByRole('link', { name: 'Secure Checkout' }).click();
    }

    async verifyShoppingCartHeader() {
        await expect(this.shoppingCartHeader).toBeVisible()
    }

    async verifyProductNameInCart(producttitle, title) {
        const productName = await this.page.locator('//*[contains(@class,"items-start")]//*[normalize-space(text())="' + producttitle + '"]')
        await expect(productName).toHaveText(title)
    }

    async verifyGiftOptionInCartPage(name) {
        const giftOption = await this.page.locator('//*[normalize-space(text())="' + name + '"]/..//*[contains(@class,"gift-options")]')
        await expect(giftOption).not.toHaveClass(/gift-options--selected/)
    }

    async clickGiftOption(name) {
        const giftOption = await this.page.locator('//*[normalize-space(text())="' + name + '"]/..//*[contains(@class,"gift-options")]')
        await giftOption.click()
    }

    async verifyGiftOptionIsUnchecked() {
        await expect(this.thisIsGiftCheckBoxButton).not.toBeChecked()
    }

    async verifyEditGiftOptionInCartPage(name) {
        const giftOption = await this.page.locator('//*[normalize-space(text())="' + name + '"]/..//*[contains(@class,"gift-options")]')
        await expect(giftOption).toHaveClass(/gift-options--selected/)
    }

    async verifyEditGiftOptionIsChecked() {
        await expect(this.thisIsGiftCheckBoxButton).toBeChecked()
    }

    async removeProduct(productTitle) {
        const productRemove = await this.page.locator('//*[normalize-space(text())="' + productTitle + '"]/../../..//*[normalize-space(text())="Remove"]')
        await productRemove.click()
    }

    async verifytheProductTitleIsRemovedFromCart(productTitle) {
        await this.page.waitForTimeout(this.mediumTimeOut)
        const productRemove = await this.page.locator('//*[@id="cart-products"]//*[normalize-space(text())="' + productTitle + '"]')
        await expect(productRemove).not.toBeVisible()
    }

    async verifyEmptyCartIsDisplayed() {
        await expect(this.emptyCartHeader).not.toHaveClass('hidden')
    }

    async closeCart() {
        await this.closeCartButton.click()
    }

    async clickThisIsGiftCheckbox() {
        await this.thisIsGiftCheckBoxButton.click()
    }

    async clickSaveGiftOptionAndContinue(saveGift) {
        await this.page.getByRole('button', { name: `${saveGift}` }).click()
    }

    async verifySubscriptionToggle(toggle) {
        await expect(this.subscriptionToggle).toHaveText(toggle)
    }

    async clickSubscriptionToggle() {
        await this.subscriptionToggle.click()
    }

    async verifyGiftOptionPageHeader() {
        await expect(this.giftOptionPageHeader).toBeVisible()
    }

    async getAddOnsProductTitle() {
        return this.addOnsProductTitle.nth(0).innerText()
    }

    async clickAddToOrder(addToOrder) {
        await this.page.getByRole('button', { name: `${addToOrder}` }).nth(0).click()
    }

    async getProductTitleInCartPage() {
        await this.page.waitForTimeout(this.mediumTimeOut)
        return this.productTilteTextInCart.nth(0).innerText()
    }

    async getSubTotalPrice() {
        const getSubTotal = await this.getSubTotalPriceText.nth(1).innerText()
        return getSubTotal.replace(/\$/g, '')
    }

    async verifyAddOnsProducts() {
        await expect(this.addOnsProductHeader).toBeVisible()
    }

    async verifyEmailGiftMessageCheckBox() {
        await expect(this.emailGiftMessageCheckBox).toBeVisible()
    }

    async verifyEmailGiftCheckBoxIsUnchecked() {
        await expect(this.emailGiftMessageCheckBox).not.toBeChecked()
    }

    async clickEmailGiftCheckBox() {
        await this.emailGiftMessageCheckBox.click()
    }

    async verifyEmailGiftCheckBoxIsChecked() {
        await expect(this.emailGiftMessageCheckBox).toBeChecked()
    }

    async verifyGiftMessageOptions() {
        await expect(this.giftMessageOptions).not.toHaveClass(/hidden/)
    }

    async verifyGiftOptionHeader() {
        await expect(this.giftOptionHeader).toBeVisible()
    }

    async verifySendImmediatlyRadioButtonIsUnchecked() {
        await expect(this.sendImmediatlyRadioButton).not.toBeChecked()
    }

    async clickSendImmediatlyRadioButton() {
        await this.sendImmediatlyRadioButton.click()
    }

    async verifySendImmediatlyRadioButtonIsChecked() {
        await expect(this.sendImmediatlyRadioButton).toBeChecked()
    }

    async verifySendGiftLaterIsUnchecked() {
        await expect(this.sendGiftLaterRadioButton).not.toBeChecked()
    }

    async verifySendGiftLaterIsChecked() {
        await expect(this.sendGiftLaterRadioButton).toBeChecked()
    }

    async clickSendGiftLaterRadioButton() {
        await this.sendGiftLaterRadioButton.click()
    }

    async verifyOnSpecificDayRadioButtonIsUnchecked() {
        await expect(this.onSpecificDayRadioButton).not.toBeChecked()
    }

    async verifyOnSpecificDayRadioButtonIsChecked() {
        await expect(this.onSpecificDayRadioButton).toBeChecked()
    }

    async clickOnSpecificDayRadioButton() {
        await this.onSpecificDayRadioButton.click()
    }

    async enterPersonalizationGiftMessages(message) {
        await this.personalizedGiftMessagesInputField.fill(message)
    }

    async getPersonalizedText() {
        return this.personalizedGiftMessagesInputField.textContent()
    }

    async enterRecipientFullName(name) {
        await this.recipientNameInputField.fill(name)
    }

    async getRecipientName() {
        return this.recipientNameInputField.getAttribute("value")
    }

    async enterRecipientEmail(email) {
        await this.recipientEmailInputField.fill(email)
    }

    async getRecipientEmail() {
        return this.recipientEmailInputField.getAttribute("value")
    }

    async verifyPersonalizedGiftMessageOptional() {
        await expect(this.personalizedGiftMessageOptionalText).toBeVisible()
    }

    async getDateDisplayedDate() {
        return this.dateInputField.getAttribute("value")
    }

    getFutureDate() {
        const currentDate = new Date();
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 1);
        const formattedFutureDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
        return formattedFutureDate
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click()
    }

    async verifyCountOfProduct(count) {
        await expect(this.cartProductcount).toHaveCount(count)
    }

    async getTermInCart() {
        return this.getTermTextInCart.innerText()
    }

    async verifyCalculateCheckoutTextIsDisplayedInCartPage(checkout) {
        await expect(this.calculateCheckOutPageTextInCartPage.nth(0)).toHaveText(checkout)
    }

    async verifyTaxShippingDiscountTextIsDisplayedInCartPage(discount) {
        await expect(this.taxShippingDiscountsTextInCartPage.nth(0)).toHaveText(discount)
    }

    async getSubscriptionTermInCartPage() {
        const getsubscriptionTermInCartPage = await this.getTermTextInCart.innerText()
        const splitTermInCartPage = getsubscriptionTermInCartPage.match(/(\d+\s*Month)/);
        return splitTermInCartPage ? splitTermInCartPage[0] : null;
    }

    async verifyaddonTitleAndArrowinCartaPage() {
        await expect(this.addonsheading).toBeVisible()
        await expect(this.addonRightArrow).toBeVisible()
        await expect(this.addonLeftArrow).toBeVisible()
    }

    async clickCloseButton() {
        await this.closeButton.click()
    }

    async clickAddOnsProductAndVerify() {
        const countForAddonsProduct = await this.addToOrderButton.count()
        for (let i = countForAddonsProduct - 1; i >= 0; i--) {
            const addOnsProductTitle = await this.addOnsProductTitle.nth(i).innerText()
            await this.addToOrderButton.nth(i).click()
            await this.page.waitForTimeout(this.mediumTimeOut)
            const addedAddOnsProductTitle = await this.productTilteTextInCart.nth(0).innerText()
            expect(addOnsProductTitle).toEqual(addedAddOnsProductTitle)
        }
    }

    async verifyErrorToolMessageIsDisplayed() {
        const element = await this.page.$('#gift-gift_recipient_name');
        const attributeName = 'required';
        const attributeValue = await element.getAttribute(attributeName);
        if (attributeValue !== null && attributeValue !== undefined) {
            await expect(this.recipientNameInputField).toBeVisible()
        }
        else {
            await expect(this.recipientNameInputField).not.toBeVisible()
        }
    }
}

module.exports = { CartPage }