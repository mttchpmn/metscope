"use strict";

const allSettled = require("promise.allsettled");

const winston = require("../../config/winston");
const scrapeStatic = require("./scrapers/_static");
const allWebcams = require("../../config/webcams").all;

module.exports = (req, res) => {
  winston.info("Scraping all webcams");

  const promises = allWebcams.map(cam => {
    if (cam.static) return scrapeStatic(cam.code, cam.originUrl);
    let dynamicScraper = require(`./scrapers/${cam.code}`);

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
        .map(i => i.value);

      return res
        .status(200)
        .json({ message: "Scraping successful", successes, failures });
    })
    .catch(error => {
      winston.error(error.message);
      return res
        .status(500)
        .json({ message: "Internal Error", error: error.message });
    });
};
