const winston = require("../../../config/winston");
const saveImageIfNew = require("../../../services/saveImageIfNew");
const saveWebcamToDatabase = require("../../../services/saveWebcamToDatabase");

module.exports = (webcamName, imageUrl, req, res) => {
  saveImageIfNew(webcamName, imageUrl)
    .then(fileName => {
      // A new image was saved
      if (fileName) {
        return saveWebcamToDatabase(webcamName, fileName);
      }
      // No new image was saved
      winston.info("Image already exists in database");
      return;
    })
    .then(resObj => {
      if (resObj) {
        winston.info(
          `Image added to database with attributes: ${JSON.stringify(resObj)}`
        );
        return res.status(201).json({
          message: `Image added to database with attributes: ${JSON.stringify(
            resObj
          )}`
        });
      }
      return res.status(200).json({
        message: "Image already exists in database"
      });
    })
    .catch(err => {
      winston.error(err);
      return res.json({ status: 500, message: err });
    });
};
