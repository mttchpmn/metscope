const cheerio = require("cheerio");

const pool = require("../../../config/db");
const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const imageToString = require("../../../services/convertImageToString");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

const processWebcamSendResponse = require("../../../services/processWebcamSendResponse");

module.exports = (name, baseUrl, req, response) => {
  const allImages = [];
  getPage(baseUrl)
    .then(res => cheerio.load(res.content))
    .then($ => {
      $("img").map((i, elem) => {
        if (elem.attribs.src.includes("webcamNE"))
          allImages.push(elem.attribs.src);
      });
      const imageUrl = allImages[0];
      return imageUrl;
    })
    .then(imageUrl => processWebcamSendResponse("whareKeaNE", imageUrl))
    .then(resObj => response.json(resObj))
    .catch(err =>
      response.json({ status: 500, message: `Internal error:\n${err}` })
    );
};
