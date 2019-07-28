"use strict";

const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const winston = require("../../config/winston");
const webcamList = require("../../config/webcams").all;
const Webcam = require("../../../database/models").Webcam;

const loadWebcam = (req, res) => {
  winston.info(`Loading all webcams`);

  const allNames = webcamList.map(cam => cam.code);
  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  Webcam.findAll({ where: { date: { [Op.gt]: twentyFourHoursAgo } } })
    .then(webcams => {
      let resultArray = webcamList.map(cam => {
        cam.images = webcams.filter(i => i.name === cam.code);
        delete cam.originUrl;
        delete cam.static;
        return cam;
      });

      return res.status(200).json(resultArray);
    })
    .catch(err => {
      winston.error(err.message);
      return res.status(500).json({ message: "Internal error" });
    });
};

module.exports = loadWebcam;
