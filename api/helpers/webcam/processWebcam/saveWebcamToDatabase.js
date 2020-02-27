"use strict";

const moment = require("moment");
const appPath = require("app-root-path");

const config = require(`../../../../config`);
const Webcam = require("../../../../database/models").Webcam;
const winston = require("../../../services/winston");

// Given webcam code, and filename on disk, save webcam details to DB
module.exports = async (webcamCode, fileName) => {
  winston.debug(`[${webcamCode}]: Saving webcam to database...`);
  const date = moment.utc().format();
  const url = `${config.domain.baseUrl}/images/${webcamCode}/${fileName}`;
  const location = `${appPath}/images/${webcamCode}/${fileName}`;

  try {
    await Webcam.create({ name: webcamCode, date, url, location });
    winston.debug(`[${webcamCode}]: Webcam saved to database.`);
    return;
  } catch (error) {
    throw error;
  }
};
