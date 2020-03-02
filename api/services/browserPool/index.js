"use strict";

const genericPool = require("generic-pool");
const puppeteer = require("puppeteer");

const winston = require("../winston");

const factory = {
  create: async function() {
    try {
      winston.debug("Launching browser instance");
      const browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36"
        ]
      });

      return browser;
    } catch (error) {
      winston.error(`Error launching browser instance: \n${error}`);
    }
  },
  destroy: function(browser) {
    return browser.close();
  }
};

const options = {
  max: 5,
  min: 2
};

const browserPool = genericPool.createPool(factory, options);

module.exports = browserPool;
