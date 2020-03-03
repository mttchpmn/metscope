"use strict";

const cheerio = require("cheerio");

const getWebContent = require("../../../../../util/getWebContent");

module.exports = async originUrl => {
  let imageUrl;

  try {
    const html = await getWebContent(originUrl, true);
    const $ = cheerio.load(html);
    $(".webcam-current-image").map((i, elem) => {
      if (elem.attribs.src.includes("waterfront-cam"))
        imageUrl = `https://www.lakewanaka.co.nz/${elem.attribs.src}`;
    });

    return imageUrl;
  } catch (error) {
    throw error;
  }
};
