const cheerio = require("cheerio");

const pool = require("../../../config/db");
const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const imageToString = require("../../../services/convertImageToString");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

module.exports = (name, baseUrl, req, response) => {
  getPage(baseUrl)
    .then(res => {
      const $ = cheerio.load(res.content);

      const allImages = [];

      $("img").map((i, elem) => {
        if (elem.attribs.src.includes("webcamW"))
          allImages.push(elem.attribs.src);
      });
      const imageUrl = allImages[0];
      imageToString(imageUrl).then(str => {
        saveWebcam(name, imageUrl, str, response);
      });
    })

    // TODO - Implement the err from the underlying function
    .catch(err => winston.error("Failed to get webpage for Whare Kea West"));
};
