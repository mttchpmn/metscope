"use strict";

const cheerio = require("cheerio");

const getWebContent = require("../../../../../util/getWebContent");

module.exports = async originUrl => {
  let imageUrl;

  try {
    const html = await getWebContent(originUrl);
    const $ = cheerio.load(html);
    $("img").map((i, elem) => {
      if (elem.attribs.src.includes("treblecone"))
        imageUrl = `https://www.wanakaairport.com/${elem.attribs.src}`;
    });

    return imageUrl;
  } catch (error) {
    throw error;
  }
};
