// External imports
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const appPath = require("app-root-path");

// Internal imports
const winston = require("../config/winston");

// Convert fs callback functions to Promises
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

// Wrapper function for readability
const _saveFile = (webcamName, url, fileName) =>
  new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(
      `${appPath}/images/${webcamName}/${fileName}`
    );

    axios({ method: "get", url: url, responseType: "stream" }).then(
      response => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      }
    );
  });

module.exports = (webcamName, url, fileName) =>
  new Promise((resolve, reject) => {
    winston.info("Saving image to file...");

    // Check if directory already exists
    access(`${appPath}/images/${webcamName}/`)
      // Dir exists
      .then(() => {
        winston.info(`${webcamName} directory exists. Will use.`);

        _saveFile(webcamName, url, fileName)
          .then(() => {
            winston.info("File saved successfully");
            resolve(fileName);
          })
          .catch(() => winston.error("Error saving file"));
      })
      // Dir doesn't exist
      .catch(err => {
        winston.warn(`${webcamName} directory did not exist.  Creating...`);

        // Create the directory
        mkdir(`${appPath}/images/${webcamName}`)
          .then(() => {
            _saveFile(webcamName, url, fileName)
              .then(() => {
                winston.info("File saved successfully");
                resolve(fileName);
              })
              .catch(() => winston.error("Error saving file"));
          })
          .catch(err => winston.error(`Error creating directory: ${err}`));
      });
  });
