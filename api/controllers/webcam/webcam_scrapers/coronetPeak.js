const cheerio = require("cheerio");

const pool = require("../../../config/db");
const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const imageToString = require("../../../services/convertImageToString");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

module.exports = (req, response) => {
  const baseUrl = "https://www.coronetpeak.co.nz/weather-report/";

  getPage(baseUrl, 10)
    .then(res => {
      let urlRegex = new RegExp(
        /(\/Webcams\/CoronetPeak\/SugarsRun\/\d{12}\.jpg)+/g
      );

      let allImages = res.content.match(urlRegex); // Will get all the image URLs from the day
      const imageUrl = `https://www.coronetpeak.co.nz${allImages.pop()}`;

      imageToString(imageUrl).then(str => {
        saveWebcam("coronet", imageUrl, str, response);
      });
    })

    // TODO - Implement the err from the underlying function
    .catch(err => winston.error("Failed to get webpage for Coronet"));
};
