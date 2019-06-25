const cheerio = require("cheerio");

const pool = require("../../../config/db");
const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const imageToString = require("../../../services/convertImageToString");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

module.exports = (req, response) => {
  const imageUrl = "https://metdata.net.nz/es/stanne/cam1/image.php";

  imageToString(imageUrl).then(str => {
    saveWebcam("stAnne", imageUrl, str, response);
  });
};
