"use strict";

// NOTE - this is a wrapper function that wraps the file save, and db save
// For ease of use and readability in the controllers
const winston = require("../config/winston");
const saveImageIfNew = require("./saveImageIfNew");
const saveWebcamToDatabase = require("./saveWebcamToDatabase");

module.exports = (webcamName, imageUrl) =>
  new Promise((resolve, reject) => {
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
          resolve({
            status: 201,
            message: `Image added to database with attributes: ${JSON.stringify(
              resObj
            )}`
          });
        }
        resolve({
          status: 200,
          message: "Image already exists in database"
        });
      })
      .catch(err => {
        winston.error(err);
        reject(err);
      });
  });
