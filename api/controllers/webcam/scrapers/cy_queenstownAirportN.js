"use strict";

const cheerio = require("cheerio");

const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const processWebcam = require("../../../services/processWebcam");

module.exports = (code, originUrl) => {
  let imageUrl;

  return getPage(originUrl)
    .then(res => cheerio.load(res.content))
    .then($ => {
      $("img").map((i, elem) => {
        if (elem.attribs.src.includes(`/Webcams/coronet`))
          imageUrl = `https://queenstownairport.co.nz${elem.attribs.src}`;
      });
      return imageUrl;
    })
    .then(imageUrl => processWebcam(code, imageUrl));
};
