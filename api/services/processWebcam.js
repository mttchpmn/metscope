"use strict";

// NOTE - this is a wrapper function that wraps the file save, and db save
// For ease of use and readability in the controllers
const winston = require("../config/winston");
const saveImageIfNew = require("./processWebcam/saveImageIfNew");
const saveWebcamToDatabase = require("./processWebcam/saveWebcamToDatabase");

module.exports = (code, imageUrl) =>
  new Promise((resolve, reject) => {
    saveImageIfNew(code, imageUrl)
      .then(fileName => {
        // A new image was saved
        if (fileName) return saveWebcamToDatabase(code, fileName);
        // No new image was saved
        return;
      })
      .then(newImage => {
        if (newImage) {
          winston.info(`[${code}]: New image added to DB`);
          return resolve({ code, newImage: true });
        }
        winston.info(`[${code}]: Image already exists in DB`);
        return resolve({ code, newImage: false });
      })
      .catch(err => reject(err, code));
  });
