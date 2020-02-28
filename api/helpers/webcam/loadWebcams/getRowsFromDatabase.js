"use strict";

const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Webcam = require("../../../../database/models").Webcam;
const viewThreshold = require("../../../../config").app.viewThreshold;

module.exports = async area => {
  const timeThreshold = moment
    .utc()
    .subtract(viewThreshold, "hours")
    .format();

  try {
    let rows;
    if (area === "all") {
      rows = await Webcam.findAll({
        where: {
          date: { [Op.gt]: timeThreshold }
        }
      });
    } else {
      rows = await Webcam.findAll({
        where: {
          area,
          date: { [Op.gt]: timeThreshold }
        }
      });
    }

    return rows;
  } catch (error) {
    throw error;
  }
};
