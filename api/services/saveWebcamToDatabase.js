"use strict";

// External Imports
const moment = require("moment");
const appPath = require("app-root-path");

// Internal Imports
const config = require("../config/config");
const winston = require("../config/winston");
const Webcam = require("../../database/models").Webcam;

module.exports = (name, fileName) =>
  new Promise((resolve, reject) => {
    winston.info(`Attempting to save ${name} webcam to database`);

    const savedDate = moment.utc().format();
    const hostedUrl = `${config.domain.baseUrl}/images/${name}/${fileName}`;
    const fileLocation = `${appPath}/images/${name}/${fileName}`;

    Webcam.create({
      name,
      date: savedDate,
      url: hostedUrl,
      location: fileLocation
    })
      .then(() => {
        winston.info(`Image added to database with date: ${savedDate}`);
        resolve(true);
      })
      .catch(err => reject(err));
  });
