const { expect } = require("@playwright/test")

var coupone1, coupone2, productTitleInCollections

class ProductDetailsPage {
    constructor(page, page1) {
        this.page = page
        this.page1 = page1
        this.productBoxTitle = this.page.locator('#pdp-sidebar h1')
        this.selectSubscriptions = this.page.locator(".term-label span")
        this.addCardButton = this.page.locator('#add-to-cart')
        this.counponesList = this.page.locator('.discount-label').nth(0)
        this.couponesRadioButton = this.page.locator('#pdp-coupon-picker [type="radio"]')
        this.productTitle = this.page.locator('#pdp-sidebar h1')
        this.personalizationHeader = this.page.locator('#pdp-personalization')
        this.addPersonalizationButton = this.page.locator('#app--personalization-open')
        this.personalizationPopupHeader = this.page.locator('#pdp-personalization-modal')
        this.doneButton = this.page.locator('.app--personalization-close')
        this.personalizationCheckmark = this.page.locator('#pdp-personalization--checkmark')
        this.personalizationerrormessage = this.page.locator('#pdp-personalization--error')
        this.getTermSubscriptionMonth = this.page.locator(".term-label")
        this.getMonthTextInProductDetailsPage = this.page.locator('.term-label h6')
        this.emailInputField = this.page.locator('[placeholder="Enter your email"]')
        this.notifyMeWhenAvailableButton = this.page.locator('//*[normalize-space(text())="Notify me when available"]')
        this.addListText = this.page.locator('//*[@placeholder="Enter your email"]/..//p[contains(@class,"text-sm")]')
        this.counponesLists = this.page.locator('.discount-label').nth(1)
        this.productTitleInBestSellerPage = this.page.locator('.app--listing-card a')
        this.notFoundText = this.page.locator('//*[contains(text(),"Not found")]')
        this.pageSize = this.page.locator('#page_size')
        this.pageNextButton = this.page.locator('//*[normalize-space(text())="Next"]')
        this.videoPlayButton = this.page.locator('[id="details"] a img')
        this.pastBoxButton = this.page.locator('//*[text()="Past Boxes"]')
        this.getPriceOfTheProduct = this.page.locator('//*[@class="term-label"]//h6/following-sibling::span')
        this.lowerTimeout = 2000
        this.mediumTimeout = 5000
        this.largerTimeout = 7000
    }

    async verifyProductBoxTitle(name) {
        await expect(this.productBoxTitle).toHaveText(name)
    }

    async selectSubscription(monthOption) {
        const month = await this.page.locator('[class="term-label"] h6:has-text("' + monthOption + '")')
        await month.click()
    }

    async verifySubscriptionIsChecked(monthOption) {
        const month = await this.page.locator('[class="term-label"] h6:has-text("' + monthOption + '")')
        await expect(month).toBeChecked()
    }

    async getProductDetailsPagePrice() {
        const price = await this.getPriceOfTheProduct.nth(0).textContent()
        const match = price.match(/\d+\.\d+/)
        return match[0]
    }

    async getProductPriceInDetailsPage() {
        const price = await this.getPriceOfTheProduct.nth(1).textContent()
        const match = price.match(/\d+\.\d+/)
        return match[0]
    }

    async clickAddToCard() {
        await this.addCardButton.click()
    }

    async verifyAddCartButtonIsDisplayed() {
        await expect(this.addCardButton).toBeVisible()
    }

    async clickGiveAsAGift(buttontext) {
        await this.page.getByRole('button', { name: `${buttontext}` }).click()
    }

    async getCouponesCount() {
        return await this.counponesList.count()
    }

    async getCouponesText() {
        return this.counponesList
    }

    async verifyCouponesRadioButton() {
        await expect(this.couponesRadioButton).toBeChecked()
    }

    async verifyThatCouponsAreNotDuplicateAndSelectable() {
        const countCoupones = await this.counponesList.count()
        expect(countCoupones).toBeLessThan(3)
        if (await this.counponesList.isVisible()) {
            if (0 < countCoupones < 3) {

                for (let i = 1; i <= countCoupones; i++) {
                    const couponesLocator = await this.counponesList.nth(i - 1)
                    const couponesRadioButton = await this.couponesRadioButton.nth(i - 1)
                    if (i == 1) {
                        coupone1 = await couponesLocator.textContent()
                        await couponesLocator.click()
                        expect(await couponesRadioButton).toBeChecked()
                    }

                    else if (i == 2) {
                        coupone2 = await couponesLocator.textContent()
                        await couponesLocator.click()
                        expect(await couponesRadioButton).toBeChecked()
                    }
                }
                if (countCoupones == 2) {
                    expect(await coupone1).not.toEqual(coupone2)
                }
            }
        }
    }

    async counponesRadioButton() {
        await this.counponesList
    }

    async getProductTitle() {
        return this.productTitle.innerText()
    }

    async navigateToBackPage() {
        await this.page.goBack({ waitUntil: 'networkidle' })
    }

    async goBack() {
        if (!this.page1.isClosed()) {
            await this.page1.waitForLoadState('load');
            await this.page1.goBack();
        } else {
            console.log('Page is closed. Cannot go back.');
        }
    }

    async verifyPersonalizationHeaderIsDisplayed() {
        await expect(this.personalizationHeader).toBeVisible()
    }

    async clickAddPersonalizationButton() {
        await this.addPersonalizationButton.click()
    }

    async verifyPersonalizationSubscriptionPopupIsDisplayed() {
        await expect(this.personalizationPopupHeader).toHaveClass(/active/)
    }

    async clickDone() {
        await this.doneButton.click()
    }

    async verifyPersonalizationCheckmarkIsDisplayed() {
        await expect(this.personalizationCheckmark).not.toHaveClass(/hidden/)
    }

    async verifyAddPersonalizationErrorMessageIsDisplayed() {
        await expect(this.personalizationerrormessage).not.toHaveClass(/hidden/)
    }

    async fillRequiredFiledInPersonalizationSubscription(inputTitle, name) {
        const fillRequiredInputField = await this.page.locator('//*[normalize-space(text())="' + inputTitle + '"]/..//input')
        await fillRequiredInputField.fill(name)
    }

    async fillRequiredTextInPersonalizationSubscription(inputTitle, name) {
        const fillRequiredInputField = await this.page.locator('//*[normalize-space(text())="' + inputTitle + '"]/..//textarea')
        await fillRequiredInputField.fill(name)
    }

    async getCouponpercentage() {
        const countCoupones = await this.counponesList.count()
        if (await this.counponesList.isVisible()) {
            if (0 < countCoupones < 3) {

                for (let i = 1; i <= countCoupones; i++) {
                    const couponesLocator = await this.counponesList.nth(i - 1)
                    const couponesRadioButton = await this.couponesRadioButton.nth(i - 1)
                    if (i === 1) {
                        coupone1 = await couponesLocator.textContent()
                        await couponesLocator.click()
                        expect(await couponesRadioButton).toBeChecked()
                    }
                }
            }
        }
        const matchResult = coupone1.match(/(\d+)% off/);
        return matchResult ? matchResult[1] : null;
    }

    async getCouponName() {
        const countCoupones = await this.counponesList.count()
        if (await this.counponesList.isVisible()) {
            if (0 < countCoupones < 3) {
                const couponesLocator = await this.counponesList.nth(0)
                const couponesRadioButton = await this.couponesRadioButton.nth(0)
                coupone1 = await couponesLocator.textContent()
                await couponesLocator.click()
                expect(await couponesRadioButton).toBeChecked()
            }
        }
        const regex = /code\s(.*?)\sfor/;
        const matchResult = coupone1.match(regex);
        return matchResult ? matchResult[1] : null;
    }

    async getMonthText() {
        return this.getMonthTextInProductDetailsPage.nth(1).innerText()
    }

    async verifyAddCartButtonIsNotDisplayed() {
        await expect(this.addCardButton).not.toBeVisible()
    }

    async enterEmail(email) {
        await this.emailInputField.fill(email)
    }

    async clickNotifymeWhenAvailable() {
        await this.notifyMeWhenAvailableButton.click()
    }

    async verifyAddListTextIsDisplayed() {
        await expect(this.addListText).toHaveText("You're on the list!")
    }

    async getLongTermProductPriceInDetailsPage() {
        const price = await this.getPriceOfTheProduct.nth(3).textContent()
        const match = price.match(/\d+\.\d+/)
        return match[0]
    }

    async getShirtTermProductPriceInDetailsPage() {
        const price = await this.getPriceOfTheProduct.nth(0).textContent()
        const match = price.match(/\d+\.\d+/)
        return match[0]
    }

    async clickOnLongTermSubscription() {
        await this.getMonthTextInProductDetailsPage.nth(3).click()
    }

    async clickOnShirtTermSubscription() {
        await this.getMonthTextInProductDetailsPage.nth(0).click()
    }

    async getMutipleCoupns() {
        const countCoupones = await this.counponesList.count()
        if (await this.counponesList.isVisible()) {
            if (1 < countCoupones < 3) {

                for (let i = 1; i <= countCoupones; i++) {
                    const couponesLocator = await this.counponesList.nth(i - 1)
                    const couponesRadioButton = await this.couponesRadioButton.nth(i - 1)
                    if (i == 1) {
                        coupone1 = await couponesLocator.textContent()
                        await couponesLocator.click()
                        expect(await couponesRadioButton).toBeChecked()
                    }

                    else if (i == 2) {
                        coupone2 = await couponesLocator.textContent()
                        await couponesLocator.click()
                        expect(await couponesRadioButton).toBeChecked()
                    }
                }
            }

        }
        const matchResult = coupone1.match(/(\d+)% off/);
        return matchResult ? matchResult[1] : null;
    }

    async getDiscountCoupons() {
        var i = 1
        while (i > 0) {
            await this.page.waitForTimeout(this.lowerTimeout)
            if (await this.productTitleInBestSellerPage.nth(i).isVisible()) {
                await this.productTitleInBestSellerPage.nth(i).click()
                await this.page.waitForTimeout(this.lowerTimeout)
                if (await this.counponesLists.isVisible()) {
                    coupone1 = await this.counponesList.textContent()
                    coupone2 = await this.counponesLists.textContent()
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
        const firstCouponPercentage = matchResult1 ? matchResult1[1] : null;

        const regex = /code\s(.*?)\sfor/;
        const matchResult = coupone1.match(regex);
        const firstCouponName = matchResult ? matchResult[1] : null;

        const matchResult2 = coupone2.match(/(\d+)% off/);
        const secoundCouponPercentage = matchResult2 ? matchResult2[1] : null;

        const regex2 = /code\s(.*?)\sfor/;
        const matchResult12 = coupone2.match(regex2);
        const secoudCouponName = matchResult12 ? matchResult12[1] : null;
        return [firstCouponPercentage, secoundCouponPercentage, firstCouponName, secoudCouponName]
    }

    async verifyDealLinksIsNotDisplayed() {
        await this.page.waitForTimeout(this.largerTimeout)
        const countOfProducts = await this.productTitleInBestSellerPage.count()
        for (let i = 1; i <= countOfProducts; i++) {
            await this.page.waitForTimeout(this.mediumTimeout)
            if (await this.productTitleInBestSellerPage.nth(i).isVisible()) {
                productTitleInCollections = await this.productTitleInBestSellerPage.nth(i).innerText()
                await this.productTitleInBestSellerPage.nth(i).click()
                await this.page.waitForTimeout(this.lowerTimeout)
                const productTitle = await this.productTitle.innerText()
                await expect(this.notFoundText).not.toBeVisible()
                expect(productTitleInCollections).toEqual(productTitle)
                await this.page.goBack()
            }

            else if (i === countOfProducts) {
                i = 0
                if (await this.pageNextButton.isVisible()) {
                    await this.pageNextButton.click()
                }

                else {
                    break
                }
            }
        }
    }

    async selectPageSize(numberOfProducts) {
        await this.pageSize.selectOption(numberOfProducts)
    }

    async clickOnVideoPlayButton() {
        var i = 1
        while (i > 0) {
            await this.page.waitForTimeout(this.lowerTimeout)
            if (await this.productTitleInBestSellerPage.nth(i).isVisible()) {
                await this.productTitleInBestSellerPage.nth(i).click()
                await this.page.waitForTimeout(this.lowerTimeout)
                if (await this.videoPlayButton.isVisible()) {
                    await this.videoPlayButton.click()
                    break
                }

                else {
                    await this.page.goBack({ waitUntil: 'networkidle' })
                }
            }
            i++
        }
    }

    async verifyVideoPause() {
        await this.page.waitForTimeout(9000)
        await this.page.waitForSelector('video.video-stream');
        await this.page.reload('load')
        await this.page.waitForTimeout(1000)
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000)
        const pauseScript = `document.querySelector('video.video-stream').pause();`;
        await this.page.evaluate(pauseScript);
        await this.page.waitForLoadState('domcontentloaded');
        const isPaused = await this.page.evaluate(() => {
            const video = document.querySelector('video.video-stream');
            return video.paused;
        })
        console.log(`Video is paused: ${isPaused}`);

        expect(isPaused).toBeTruthy()
    }

    async verifyVideoPlay() {
        await this.page.waitForLoadState('domcontentloaded');
        const playScript = `document.querySelector('video.video-stream').play();`;
        await this.page.evaluate(playScript);
        await this.page.waitForLoadState('domcontentloaded');
        const isSeeking = await this.page.evaluate(() => {
            const video = document.querySelector('video.video-stream');
            return video.seeking;
        });
        console.log(`Video is played: ${!isSeeking}`);
        expect(isSeeking).toBeFalsy()
        await this.page.waitForTimeout(5000)
    }

    async clickPastBox() {
        var i = 1
        while (i > 0) {
            await this.page.waitForTimeout(this.lowerTimeout)
            if (await this.productTitleInBestSellerPage.nth(i).isVisible()) {
                await this.productTitleInBestSellerPage.nth(i).click()
                await this.page.waitForTimeout(this.lowerTimeout)
                if (await this.pastBoxButton.isVisible()) {
                    await this.pastBoxButton.click()
                    break
                }

                else {
                    await this.page.goBack({ waitUntil: 'networkidle' })
                }
            }
            i++
        }
    }

    async verifyBoldTextIsNotDisplayed() {
        const elements = await this.page.$$('#past-boxes p')

        const textsAndBoldStatus = await Promise.all(elements.map(async (element) => {
            const text = await element.innerText();
            const isBold = await element.evaluate((el) => {
                const fontWeight = window.getComputedStyle(el).getPropertyValue('font-weight');
                return fontWeight === 'bold' || parseInt(fontWeight) >= 700;
            });
            return { text, isBold };
        }));
        textsAndBoldStatus.forEach(({ text, isBold }, index) => {
            expect(isBold).toBe(false)
        });
    }

    async verifyPlaceholderImageIsNotDisplayed() {
        const images = await this.page.$$('img');
        for (const image of images) {
            const src = await image.getAttribute('src');
            const isPlaceholder = src.includes('placeholder') || src.includes('your-placeholder-pattern') || src.includes("Find a box you'll love...");
            expect(isPlaceholder).toBe(false);
        }
    }

    async verifySubscriptionTerms() {
        const elements = await this.page.$$('.term-label h6')
        const getProductTitle = []
        const termSubscription = getProductTitle

        for (const element of elements) {
            const subscriptionText = await element.innerText()
            getProductTitle.push(subscriptionText)
        }
        return termSubscription
    }

    async verifyErrorlinksAreNotDisplayed() {
        try {
            const links = await this.page.$$('href')
            for (const link of links) {
                const href = await link.getAttribute('href')
                if (!href) continue
                if (isValidUrl(href)) {
                    const response = await this.page.goto(href, { waitUntil: 'domcontentloaded' });
                    if (response.status() === 200) {
                        console.error(response.status()`${href}`);
                    } else {
                        console.log(`Link is OK: ${href}`);
                    }
                }
            }

        } catch (error) {
            console.error('An error occurred:', error);
        }

        function isValidUrl(url) {
            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

module.exports = { ProductDetailsPage }