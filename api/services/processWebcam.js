"use strict";

// NOTE - this is a wrapper function that wraps the file save, and db save
// For ease of use and readability in the controllers
const winston = require("../config/winston");
const saveImageIfNew = require("./saveImageIfNew");
const saveWebcamToDatabase = require("./saveWebcamToDatabase");

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
          winston.info(`New image added to DB for webcam: ${code}`);
          resolve({ code, newImage: true });
        }
        winston.info(`Image already exists in DB for webcam: ${code}`);
        resolve({ code, newImage: false });
      })
      .catch(err => reject(err, code));
  });
