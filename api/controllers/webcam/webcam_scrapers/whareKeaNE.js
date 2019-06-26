const cheerio = require("cheerio");

const pool = require("../../../config/db");
const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const imageToString = require("../../../services/convertImageToString");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

module.exports = (req, response) => {
  const baseUrl =
    "https://www.wharekealodge.com/the-chalet/chalet-webcam-panorama/chalet-webcamne/";

  getPage(baseUrl)
    .then(res => {
      const $ = cheerio.load(res.content);

      const allImages = [];

      $("img").map((i, elem) => {
        if (elem.attribs.src.includes("webcamNE"))
          allImages.push(elem.attribs.src);
      });
      const imageUrl = allImages[0];
      imageToString(imageUrl).then(str => {
        saveWebcam("whareKeaNE", imageUrl, str, response);
      });
    })

    // TODO - Implement the err from the underlying function
    .catch(err =>
      winston.error("Failed to get webpage for Whare Kea North East")
    );
};
