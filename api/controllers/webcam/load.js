"use strict";

const moment = require("moment");

const winston = require("../../services/winston");
const webcamList = require("../../../config/webcams").all;
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

  // Response skeleton
  let data = {
    webcam: requestedCam
  };

  // Helper function for time comparison
  const hoursAgo = num =>
    moment
      .utc()
      .subtract(num, "hours")
      .format();

  Webcam.findAll({
    where: { name: webcamName, date: { [Op.gt]: hoursAgo(12) } }
  })
    .then(images => {
      winston.info(`Found ${images.length} rows`);
      images.sort((a, b) => (a.id > b.id ? 1 : -1));

      const latestImage = images[images.length - 1];
      if (latestImage && moment(latestImage.date).isBefore(hoursAgo(2))) {
        webcam.stale = true;
      }

      data.webcam.images = images;

      res.status(200).json({ data });
    })
    .catch(err => {
      winston.error(err.message);
      res.status(500).json({ error: "Internal error" });
    });
};

module.exports = loadWebcam;
