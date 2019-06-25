const pool = require("../../../config/db");
const imageToString = require("../../../services/convertImageToString.js");
const saveWebcam = require("../../../services/saveWebcamToDatabase");

module.exports = (webcamName, imageUrl, req, res) => {
  // TODO - Handle the response seinding in this file, rather than in saveWebcam function
  imageToString(imageUrl).then(string => {
    saveWebcam(webcamName, imageUrl, string, res);
  });
};
