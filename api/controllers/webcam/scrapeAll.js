"use strict";

const allSettled = require("promise.allsettled");

const winston = require("../../config/winston");
// const scrapeStatic = require("./scrapers/_static");
const scrapeStatic = require("../../services/processWebcam");
const allWebcams = require("../../config/webcams").all;

const dynamicScrapers = require("./dynamicScrapers");

module.exports = (req, res) => {
  winston.info("Scraping all webcams");

  const promises = allWebcams.map(cam => {
    if (cam.static) return scrapeStatic(cam.code, cam.originUrl);
    return; // Added this to skip the dynamic scrapers temporarily
    try {
      let dynamicScraper = dynamicScrapers[cam.code] || scrapeStatic();
      return dynamicScraper(cam.code, cam.originUrl);
    } catch (error) {
      winston.error(error);
      winston.error(error.message);
      // winston.warn(
      //   `[${cam.code}]: Cannot load scraper function from './scrapers' does the file exist?`
      // );
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
