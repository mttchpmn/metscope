"use strict";

const cheerio = require("cheerio");

const getWebContent = require("../../../../../util/getWebContent");

module.exports = async originUrl => {
  let imageUrl;

  const html = await getWebContent(originUrl, true);
  const $ = cheerio.load(html);
  $(".webcam-current-image").map((i, elem) => {
    if (elem.attribs.src.includes("cam3"))
      imageUrl = `https://www.lakewanaka.co.nz/${elem.attribs.src}`;
  });

  return imageUrl;
};
