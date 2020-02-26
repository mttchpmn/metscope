"use strict";

const winston = require("../../config/winston");
const webcams = require("../../config/webcams");
const staticScraper = require("../../services/processWebcam");

const processWebcam = require("../../helpers/webcam/processWebcam");

module.exports = async (req, res) => {
  winston.info(`Scraping webcams for ${req.params.area}`);
  const areaWebcams = webcams[req.params.area];

  try {
    const result = await Promise.all(
      areaWebcams.map(cam => {
        // Dynamic cam
        if (!cam.static) {
          // winston.debug(`[${cam.code}]: Static: ${cam.static}`);
          // winston.debug(`Dynamic: ${JSON.stringify(cam)}`);
          // winston.debug(`[${cam.code}]: Cam is dynamic.  Skipping...`);
          return "SKIPPED DYNAMIC SCRAPER";
        }

        // Static cam
        // winston.debug(`[${cam.code}]: Static: ${cam.static}`);
        // winston.debug(`Static: ${JSON.stringify(cam)}`);
        return processWebcam(cam.code, cam.originUrl);
      })
    );
    winston.info(
      `Successfully scraped webcams for ${req.params.area}: ${JSON.stringify(
        result
      )}`
    );
    return res.status(200).json({ message: "Scrape successful", data: result });
  } catch (error) {
    winston.error(`Error: ${error}`);
    return res.status(500).json({ error: "Internal error", data: error });
  }
};
