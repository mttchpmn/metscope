"use strict";

let tidy = require("htmltidy2").tidy;
const util = require("util");
tidy = util.promisify(tidy);

const browserPool = require("../../../services/browserPool");

module.exports = async url => {
  try {
    const browser = await browserPool.acquire();

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const rawHtml = await page.content();
    const cleanHtml = await tidy(rawHtml);
    await browserPool.release(browser);

    return cleanHtml;
  } catch (error) {
    throw error;
  }
};
