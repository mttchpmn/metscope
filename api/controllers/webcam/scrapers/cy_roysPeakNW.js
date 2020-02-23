"use strict";

const cheerio = require("cheerio");

const getDynamicPage = require("../../../services/getDynamicWebContent");
const processWebcam = require("../../../services/processWebcam");

module.exports = (code, originUrl) => {
  return getDynamicPage(originUrl)
    .then(html => cheerio.load(html))
    .then($ => {
      let imageUrl;
      $(".webcam-current-image").map((i, elem) => {
        if (elem.attribs.src.includes("cam5"))
          imageUrl = `https://www.lakewanaka.co.nz/${elem.attribs.src}`;
      });
      return imageUrl;
    })
    .then(imageUrl => {
      processWebcam(code, imageUrl);
    });
};
