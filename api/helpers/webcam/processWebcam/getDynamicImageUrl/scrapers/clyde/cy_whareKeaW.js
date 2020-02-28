"use strict";

const cheerio = require("cheerio");

const getWebContent = require("../../../../../util/getWebContent");

module.exports = async originUrl => {
  let imageUrl;

  const html = await getWebContent(originUrl);
  const $ = cheerio.load(html);
  $(".webcam-current-image").map((i, elem) => {
    if (elem.attribs.src.includes("webcamW")) imageUrl = elem.attribs.src;
  });

  return imageUrl;
};
