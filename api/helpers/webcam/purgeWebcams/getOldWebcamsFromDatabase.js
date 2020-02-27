"use strict";

const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Webcam = require("../../../../database/models").Webcam;

module.exports = async purgeThreshold => {
  const purgeTime = moment
    .utc()
    .subtract(purgeThreshold, "hours")
    .format();

  const oldWebcams = await Webcam.findAll({
    where: {
      date: {
        [Op.lt]: purgeTime
      }
    }
  });

  return oldWebcams;
};
