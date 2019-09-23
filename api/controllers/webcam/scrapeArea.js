"use strict";

const winston = require("../../config/winston");
const allWebcams = require("../../config/webcams");
const staticScraper = require("../../services/processWebcam");

module.exports = (req, res) => {
  const area = req.params.area;
  winston.info(`Scraping webcams for ${area}`);

  const areaWebcams = allWebcams[area];

  Promise.all(
    areaWebcams.map(cam => {
      // Dynamic cam
      if (!cam.static) {
        winston.debug(`[${cam.code}]: Static: ${cam.static}`);
        winston.debug(`[${cam.code}]: Cam is dynamic.  Skipping...`);
        return "SKIPPED DYNAMIC SCRAPER";
      }

      // Static cam
      winston.debug(`[${cam.code}]: Static: ${cam.static}`);
      return staticScraper(cam.code, cam.originUrl);
    })
  )
    .then(result => {
      winston.info(
        `Successfully scraped webcams for ${area}: ${JSON.stringify(result)}`
      );
      return res
        .status(200)
        .json({ message: "Scrape successful", data: result });
    })
    .catch(err => {
      winston.error(`Error: ${err}`);
      return res.status(500).json({ error: "Internal error", data: err });
    });
};
