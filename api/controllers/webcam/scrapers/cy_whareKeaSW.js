"use strict";

const cheerio = require("cheerio");

const getPage = require("../../../services/retrieveWebPageContent");
const processWebcam = require("../../../services/processWebcam");

module.exports = (code, originUrl) => {
  const allImages = [];
  return getPage(originUrl)
    .then(res => cheerio.load(res.content))
    .then($ => {
      $("img").map((i, elem) => {
        if (elem.attribs.src.includes("webcamSW"))
          allImages.push(elem.attribs.src);
      });
      const imageUrl = allImages[0];
      return imageUrl;
    })
    .then(imageUrl => processWebcam(code, imageUrl));
};
