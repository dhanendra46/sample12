const { test } = require('@playwright/test');
const { HomePage } = require('./home-page');

const baseTest = test.extend({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

module.exports = baseTest;
