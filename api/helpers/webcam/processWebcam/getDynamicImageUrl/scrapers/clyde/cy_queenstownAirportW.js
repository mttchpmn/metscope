"use strict";

const cheerio = require("cheerio");

const getWebContent = require("../../../../../util/getWebContent");

module.exports = async originUrl => {
  let imageUrl;

  const html = await getWebContent(originUrl);
  const $ = cheerio.load(html);
  $("img").map((i, elem) => {
    if (elem.attribs.src.includes(`/Webcams/lake`))
      imageUrl = `https://queenstownairport.co.nz${elem.attribs.src}`;
  });

  return imageUrl;
};
