"use strict";

const moment = require("moment");
const appPath = require("app-root-path");

const config = require(`../../../../config`);
const Webcam = require("../../../../database/models").Webcam;
const winston = require("../../../services/winston");

module.exports = async (webcam, fileName) => {
  const { code, area, areaCode, region, zone } = webcam;
  winston.debug(`[${code}]: Saving webcam to database...`);

  const date = moment.utc().format();
  const url = `${config.domain.baseUrl}/images/${code}/${fileName}`;
  const location = `${appPath}/images/${code}/${fileName}`;

  try {
    await Webcam.create({
      code,
      area,
      areaCode,
      region,
      zone,
      date,
      url,
      location
    });
    winston.debug(`[${code}]: Webcam saved to database.`);
    return;
  } catch (error) {
    throw error;
  }
};
