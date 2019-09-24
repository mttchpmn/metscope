"use strict";

const winston = require("../../config/winston");
const allWebcams = require("../../config/webcams");
const staticScraper = require("../../services/processWebcam");

module.exports = (req, res) => {
  const area = req.params.area;
  winston.info(`Scraping webcams for ${area}`);

  const areaWebcams = allWebcams[area];

  winston.debug(`\nAREA CAMS: ${JSON.stringify(areaWebcams)}\n\n`);

  Promise.all(
    areaWebcams.map(cam => {
      // Dynamic cam
      if (!cam.static) {
        winston.debug(`[${cam.code}]: Static: ${cam.static}`);
        winston.debug(`Dynamic: ${JSON.stringify(cam)}`);
        winston.debug(`[${cam.code}]: Cam is dynamic.  Skipping...`);
        return "SKIPPED DYNAMIC SCRAPER";
      }

      // Static cam
      winston.debug(`[${cam.code}]: Static: ${cam.static}`);
      winston.debug(`Static: ${JSON.stringify(cam)}`);
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
