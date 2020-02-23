"use strict";

const cheerio = require("cheerio");

const getPage = require("../../../services/retrieveWebPageContent");
const processWebcam = require("../../../services/processWebcam");

module.exports = (code, originUrl) => {
  return getPage(originUrl)
    .then(res => cheerio.load(res.content))
    .then($ => {
      $("webcam-current-image").map((i, elem) => {
        if (elem.attribs.src.includes("waterfront-cam"))
          return elem.attribs.src;
      });
    })
    .then(imageUrl => processWebcam(code, imageUrl));
};
