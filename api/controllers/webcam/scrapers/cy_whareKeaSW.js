"use strict";

const cheerio = require("cheerio");

const getPage = require("../../../services/retrieveWebPageContent");
const processWebcamSendResponse = require("../../../services/processWebcam");

module.exports = (name, baseUrl, req, response) => {
  const allImages = [];
  getPage(baseUrl)
    .then(res => cheerio.load(res.content))
    .then($ => {
      $("img").map((i, elem) => {
        if (elem.attribs.src.includes("webcamSW"))
          allImages.push(elem.attribs.src);
      });
      const imageUrl = allImages[0];
      return imageUrl;
    })
    .then(imageUrl => processWebcamSendResponse("whareKeSW", imageUrl))
    .then(resObj => response.json(resObj))
    .catch(err =>
      response.json({ status: 500, message: `Internal error:\n${err}` })
    );
};
