"use strict";

const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");
// Import specific scrapers
const scrapeCoronetPeak = require("./scrapers/coronetPeak");
const scrapeWhareKeaSW = require("./scrapers/whareKeaSW");
const scrapeWhareKeaW = require("./scrapers/whareKeaW");
const scrapeWhareKeaNE = require("./scrapers/whareKeaNE");
const scrapeQueenstownAirport = require("./scrapers/queenstownAirport");
const scrapeStatic = require("./scrapers/static");

// TODO - Better webcam naming conventions

// Translate webcam name to scraper method
const dynamicScrapers = {
  coronet: scrapeCoronetPeak,
  whareKeaSW: scrapeWhareKeaSW,
  whareKeaW: scrapeWhareKeaW,
  whareKeaNE: scrapeWhareKeaNE,
  qnAirportW: scrapeQueenstownAirport,
  qnAirportNW: scrapeQueenstownAirport,
  qnAirportN: scrapeQueenstownAirport,
  qnAirportNE: scrapeQueenstownAirport,
  qnAirportE: scrapeQueenstownAirport
};

module.exports = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Scraping webcam for ${webcamName}`);

  // Return 404 if we can't find the requested webcam
  if (!webcamList[webcamName]) {
    winston.warn(`Scraper for webcam: ${webcamName} not found`);
    return res.json({
      status: 404,
      message: `Webcam scraper not found.  Available webcams are: ${Object.keys(
        scraperLookup
      )}`
    });
  }

  webcamList[webcamName].static
    ? scrapeStatic(webcamName, webcamList[webcamName].originUrl, req, res)
    : dynamicScrapers[webcamName](
        webcamName,
        webcamList[webcamName].originUrl,
        req,
        res
      );
};
