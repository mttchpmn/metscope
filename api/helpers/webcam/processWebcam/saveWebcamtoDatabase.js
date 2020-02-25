"use strict";

const moment = require("moment");
const appPath = require("app-root-path");

const config = require(`../../../../config`);
const Webcam = require("../../../../database/models").Webcam;

// Given webcam code, and filename on disk, save webcam details to DB
module.exports = async (webcamCode, fileName) => {
  const date = moment.utc().format();
  const url = `${config.domain.basUrl}/images/${webcamCode}/${fileName}`;
  const location = `${appPath}/images/${webcamCode}/${fileName}`;

  try {
    await Webcam.create({ name, date, url, location });
  } catch (error) {
    throw error;
  }
};
