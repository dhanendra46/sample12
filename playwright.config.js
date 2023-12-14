// @ts-check
require('@playwright/test');


const config = {
  testDir: './tests',
  //retries : 1,
  workers: 1,
  /* Maximum time one test can run for. */
  timeout: 10 * 500,
  expect: {
    timeout: 1000
  },

  use: {
    screenshot: 'on',//'only-on-failure',
    // viewport: {
    //   width : 1536,
    //   height : 824
    // },
    launchOptions: {
      args: ["--start-fullscreen"]
    },
  },

  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        headless: true
      },
    },
    {
      name: 'edge',
      use: {
        channel: 'msedge',
        headless: true
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: "firefox",
        headless: true,
        screeshot: 'only-on-failure',
        trace: 'retain-on-failure', //'on', 'off'
        video: 'only-on-failure'
      },
    },
  ],
  globalSetup: "utils/globalSetup.js"
};

module.exports = config;
