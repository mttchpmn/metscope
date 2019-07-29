"use strict";

const moment = require("moment");

const winston = require("../../config/winston");
const webcamList = require("../../config/webcams").all;
const Webcam = require("../../../database/models").Webcam;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const loadWebcam = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Loading webcams for ${webcamName}`);

  const allNames = webcamList.map(cam => cam.code);
  const requestedCam = webcamList.filter(cam => cam.code === webcamName)[0];

  if (!allNames.includes(webcamName)) {
    return res.status(404).json({ message: `Webcam: ${webcamName} not found` });
  }

  let data = {
    webcam: {
      name: webcamName,
      title: requestedCam.title,
      desc: requestedCam.desc,
      area: requestedCam.area,
      areaCode: requestedCam.areaCode,
      region: requestedCam.region,
      zone: requestedCam.zone
    }
  };

  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  Webcam.findAll({
    where: { name: webcamName, date: { [Op.gt]: twentyFourHoursAgo } }
  })
    .then(webcams => {
      winston.info(`Found ${webcams.length} rows`);
      data.webcam.images = webcams;
      res.status(200).json({ data });
    })
    .catch(err => {
      winston.error(err.message);
      res.status(500).json({ error: "Internal error" });
    });
};

module.exports = loadWebcam;
