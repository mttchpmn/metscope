// External Imports
const moment = require("moment");
const appPath = require("app-root-path");

// Internal Imports
const config = require("../config/config");
const winston = require("../config/winston");
const pool = require("../config/db");

module.exports = (name, fileName) =>
  new Promise((resolve, reject) => {
    console.log("name :", name);
    console.log("fileName :", fileName);
    winston.info(`Attempting to save ${name} webcam to database`);

    const savedDate = moment.utc().format();
    const hostedUrl = `${config.domain.baseUrl}/images/${name}/${fileName}`;
    const fileLocation = `${appPath}/images/${name}/${fileName}`;

    // Add image data to DB
    pool
      .query(
        "INSERT INTO webcams (name, url, location, date) VALUES ($1, $2, $3, $4)",
        [name, hostedUrl, fileLocation, savedDate]
      )
      .then(results => {
        winston.info(`Image added to database with date: ${savedDate}`);
        const imgObj = {
          name,
          hostedUrl,
          fileLocation,
          savedDate
        };
        resolve(imgObj);
      })
      .catch(err => reject(err));
  });
