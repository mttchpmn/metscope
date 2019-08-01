"use strict";

const allSettled = require("promise.allsettled");

const winston = require("../../config/winston");
const scrapeStatic = require("./scrapers/_static");
const allWebcams = require("../../config/webcams").all;

module.exports = (req, res) => {
  winston.info("Scraping all webcams");

  const promises = allWebcams.map(cam => {
    if (cam.static) return scrapeStatic(cam.code, cam.originUrl);
    try {
      let dynamicScraper = require(`./scrapers/${cam.code}`);
    } catch {
      winston.warn(
        `[${
          cam.code
        }]: Cannot load scraper function from './scrapers' does the file exist?`
      );
    }

    return dynamicScraper(cam.code, cam.originUrl);
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
