"use strict";

// External Imports
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Internal Imports
const winston = require("../../config/winston");
const webcamIndex = require("../../config/webcams");
const Webcam = require("../../../database/models").Webcam;

const loadAllWebcams = (req, res) => {
  winston.info(`Loading all webcams`);

  const twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();
  const threeHoursAgo = moment
    .utc()
    .subtract(3, "hours")
    .format();

  const data = {
    webcams: {}
  };

  // Find all webcams in database from the last 24 hrs
  Webcam.findAll({ where: { date: { [Op.gt]: twentyFourHoursAgo } } })
    .then(webcams => {
      // Comment out this line to add 'all' as a prop to the repsonse, which contains all cams
      // This DRAMATICALLY increases the number of lines in the response
      delete webcamIndex.all;

      Object.keys(webcamIndex).map(area => {
        data.webcams[area] = webcamIndex[area];

        data.webcams[area].map(cam => {
          delete cam.originUrl;
          delete cam.static;
          cam.images = webcams.filter(i => i.name === cam.code);
          webcams.map(i => {
            if (moment(i.date).isBefore(threeHoursAgo)) cam.stale = true;
          });
        });
      });

      return res.status(200).json({ data });
    })
    .catch(err => {
      winston.error(err.message);
      return res.status(500).json({ error: "Internal error" });
    });
};

module.exports = loadAllWebcams;
