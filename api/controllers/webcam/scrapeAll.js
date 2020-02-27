"use strict";

const allSettled = require("promise.allsettled");

const winston = require("../../services/winston");
const processWebcam = require("../../helpers/webcam/processWebcam");
const allWebcams = require("../../../config/webcams").all;

module.exports = (req, res) => {
  winston.info("Scraping all webcams");

  const promises = allWebcams.map(cam => {
    if (cam.static) return processWebcam(cam.code, cam.originUrl);
    try {
      let scrapeDynamic = require(`./scrapers/${cam.code}`);
      return scrapeDynamic(cam.code, cam.originUrl);
    } catch (error) {
      winston.error(error);
      winston.error(error.message);
    }
  });

  allSettled(promises)
    .then(response => {
      winston.info("Scraping successful");

      const successes = response
        .filter(i => i.status === "fulfilled")
        .map(i => i.value);
      const failures = response
        .filter(i => i.status === "rejected")
        .map(i => i.reason);

      return res.status(200).json({
        message: "Scraping successful",
        data: {
          successes,
          failures
        }
      });
    })
    .catch(error => {
      winston.error(error.message);
      return res.status(500).json({ error: "Internal Error" });
    });
};
