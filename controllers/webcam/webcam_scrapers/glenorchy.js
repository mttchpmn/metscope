const pool = require("../../../config/db");
const imageToString = require("../../../services/convertImageToString.js");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

module.exports = (req, res) => {
  const imageUrl = `https://www.snowgrass.co.nz/cust/glenorchy_air/images/webcam.jpg`;

  // TODO - Handle the response seinding in this file, rather than in saveWebcam function
  imageToString(imageUrl).then(string => {
    saveWebcam("glenorchy", imageUrl, string, res);
  });
};
