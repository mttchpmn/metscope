const winston = require("../../config/winston");
// Import specific scrapers
const scrapeCoronetPeak = require("./webcam_scrapers/coronetPeak");

const scrapeGlenorchy = require("./webcam_scrapers/glenorchy");
const scrapeStAnne = require("./webcam_scrapers/stAnne");

const scrapeStatic = require("./webcam_scrapers/static");

// Translate webcam name to scraper method
const scraperLookup = {
  glenorchy: scrapeGlenorchy,
  coronet: scrapeCoronetPeak,
  stAnne: scrapeStAnne
};

module.exports = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Scraping webcam for ${webcamName}`);

  // Call scraper method
  scraperLookup[webcamName](req, res);
};
