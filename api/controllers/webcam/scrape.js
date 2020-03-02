"use strict";

const winston = require("../../services/winston");
const webcamList = require("../../../config/webcams");
const processWebcam = require("../../helpers/webcam/processWebcam");

module.exports = async (req, res) => {
  const startTime = new Date();
  winston.info(`Scraping webcams for ${req.params.area}`);
  const webcams = webcamList[req.params.area];

  try {
    const values = await Promise.all(
      webcams.map(webcam => processWebcam(webcam))
    );
    const successes = values
      .filter(([code, successful]) => successful)
      .map(([code, successful]) => code);

    const failures = values
      .filter(([code, successful]) => !successful)
      .map(([code, successful]) => code);

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;
    winston.info(`Successfully scraped webcams for ${req.params.area}`);

    return res
      .status(200)
      .json({
        message: "Scrape successful",
        data: { executionTime, successes, failures }
      });
  } catch (error) {
    winston.error(`Error: ${error}`);

    return res.status(500).json({ error: "Internal error", data: error });
  }
};
