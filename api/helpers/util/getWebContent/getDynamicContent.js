"use strict";

const puppeteer = require("puppeteer");
let tidy = require("htmltidy2").tidy;
const util = require("util");
tidy = util.promisify(tidy);

module.exports = async url => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36"
      ]
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const rawHtml = await page.content();
    await browser.close();
    const cleanHtml = await tidy(rawHtml);

    return cleanHtml;
  } catch (error) {
    throw error;
  }
};
