// External imports
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const appPath = require("app-root-path");
const moment = require("moment");

// Internal imports
const winston = require("../config/winston");
const pool = require("../config/db");

// Convert fs callback functions to Promises
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Wrapper function that returns True if directory exists
const _dirExists = dirPath =>
  new Promise((resolve, reject) => {
    access(dirPath)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });

// Wrapper function for readability
const _saveFile = (webcamName, url, fileName) =>
  new Promise((resolve, reject) => {
    let newBuffer;

    axios({ method: "get", url: url, responseType: "arraybuffer" })
      .then(response => Buffer.from(response.data))
      .then(buf => {
        newBuffer = buf;
        return pool.query(
          "SELECT id, location FROM webcams WHERE name = $1 ORDER BY id DESC LIMIT 1",
          [webcamName]
        );
      })
      .then(dbResults => {
        if (!dbResults || !dbResults.rows.length) {
          winston.warn("Found no rows in databse - will save image as new");
          return;
        }
        if (!dbResults.rows[0].location) {
          winston.warn(
            "Could not find a matching file image from row - will save image as new"
          );
          return;
        }
        return readFile(dbResults.rows[0].location);
      })
      .then(oldBuffer => {
        if (!oldBuffer) return false;
        return oldBuffer.equals(newBuffer);
      })
      .then(imageExists => {
        if (!imageExists) {
          winston.info("Image is new and will be saved");
          return writeFile(
            `${appPath}/images/${webcamName}/${fileName}`,
            newBuffer
          );
        }
        resolve(false);
      })
      .then(() => resolve(true))
      .catch(err => reject(err));
  });

module.exports = (webcamName, url) =>
  new Promise((resolve, reject) => {
    winston.info("Saving image to file...");
    const fileName = `${moment.utc().format("YYYYMMDDTHHmm")}Z.jpg`;

    _dirExists(`${appPath}/images/${webcamName}/`)
      .then(exists => {
        if (!exists) {
          winston.warn(`${webcamName} directory did not exist.  Creating...`);
          return mkdir(`${appPath}/images/${webcamName}`);
        }
        winston.info(`${webcamName} directory exists. Will use.`);
        return;
      })
      .then(() => _saveFile(webcamName, url, fileName))
      .then(imageSaved => {
        if (imageSaved) {
          winston.info("File saved successfully");
          resolve(fileName);
        }
        resolve();
      })
      .catch(err => reject(err));
  });
