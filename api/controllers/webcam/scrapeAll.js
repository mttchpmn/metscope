const winston = require("../../config/winston");
// Import specific scrapers
const scrapeCoronetPeak = require("./scrapers/coronetPeak");
const scrapeWhareKeaSW = require("./scrapers/whareKeaSW");
const scrapeWhareKeaW = require("./scrapers/whareKeaW");
const scrapeWhareKeaNE = require("./scrapers/whareKeaNE");
const scrapeQueenstownAirport = require("./scrapers/queenstownAirport");
const scrapeStatic = require("./scrapers/_static");

const webcamList = require("../../config/webcams").clyde;

const allSettled = require("promise.allsettled");

// USE PROMISE.all and refactor scraper methods
// Errors are occurring (status and json = undefined) as we are not passing reponse along

module.exports = (req, res) => {
  winston.info("Scraping all webcams");

  // Promise.all method (Throwing an error - not sure why)
  const promises = webcamList
    .filter(cam => cam.static)
    .map(cam => {
      if (cam.static) return scrapeStatic(cam.code, cam.originUrl);
      return;
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
