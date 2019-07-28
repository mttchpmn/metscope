"use strict";

const winston = require("../../../config/winston");
const saveImageIfNew = require("../../../services/saveImageIfNew");
const saveWebcamToDatabase = require("../../../services/saveWebcamToDatabase");

module.exports = (code, originUrl) =>
  new Promise((resolve, reject) => {
    winston.info(`Scraping webcam: ${code}`);

    saveImageIfNew(code, originUrl)
      .then(fileName => {
        if (fileName) return saveWebcamToDatabase(code, fileName);
        winston.info("Image already exists in database");
        return;
      })
      .then(resObj => {
        if (resObj) {
          winston.info(`New image added to DB for webcam: ${code}`);
          resolve(code);
        }
        winston.info(`Image already exists in DB for webcam: ${code}`);
        resolve(code);
      })
      .catch(error => reject(error, code));
  });
