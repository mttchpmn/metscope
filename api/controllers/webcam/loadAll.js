"use strict";

// External Imports
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("lodash");

// Internal Imports
const winston = require("../../config/winston");
const webcamIndex = require("../../config/webcams");
const Webcam = require("../../../database/models").Webcam;

const loadAllWebcams = (req, res) => {
  winston.info(`Loading all webcams`);

  // Helper function for time comparison
  const hoursAgo = num =>
    moment
      .utc()
      .subtract(num, "hours")
      .format();

  const webcamSkeleton = _.cloneDeep(webcamIndex);
  delete webcamSkeleton.all; // Comment out this line to add 'all' prop to response

  // Response skeleton
  const data = {
    webcams: webcamSkeleton
  };

  // Find all webcams in database from the last 24 hrs
  Webcam.findAll({ where: { date: { [Op.gt]: hoursAgo(24) } } })
    .then(webcams => {
      // Iterate over areas
      Object.keys(data.webcams).forEach(area => {
        // Iterate over webcams in area
        data.webcams[area].forEach(webcam => {
          let images = webcams.filter(i => i.name === webcam.code);
          images.sort((a, b) => (a.id > b.id ? 1 : -1));

          const latestImage = images[images.length - 1];
          if (latestImage && moment(latestImage.date).isBefore(hoursAgo(3))) {
            webcam.stale = true;
          }

          webcam.images = images;
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
