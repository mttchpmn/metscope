"use strict";

const winston = require("../../config/winston");
const webcams = require("../../config/webcams");

const processWebcam = require("../../helpers/webcam/processWebcam");

module.exports = async (req, res) => {
  winston.info(`Scraping webcams for ${req.params.area}`);
  const areaWebcams = webcams[req.params.area];

  try {
    await Promise.all(
      areaWebcams.map(cam => {
        // Dynamic cam
        if (!cam.static) {
          return;
        }

        // Static cam
        return processWebcam(cam.code, cam.originUrl);
      })
    );
    winston.info(`Successfully scraped webcams for ${req.params.area}`);
    return res.status(200).json({ message: "Scrape successful" });
  } catch (error) {
    winston.error(`Error: ${error}`);
    return res.status(500).json({ error: "Internal error", data: error });
  }
};
