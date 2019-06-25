// Import specific scrapers
const scrapeGlenorchy = require("./webcam_scrapers/glenorchy");
const scrapeCoronetPeak = require("./webcam_scrapers/coronetPeak");

// Translate webcam name to scraper method
const scraperLookup = {
  glenorchy: scrapeGlenorchy,
  coronet: scrapeCoronetPeak
};

module.exports = (req, res) => {
  const webcamName = req.params.name;

  // Call scraper method
  scraperLookup[webcamName](req, res);
};
