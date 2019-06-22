// Import specific scrapers
const getGlenorchy = require("./webcam_scrapers/glenorchy");

// Translate webcam name to scraper method
const scraperLookup = {
  glenorchy: getGlenorchy
};

module.exports = (req, res) => {
  const webcamName = req.params.name;

  // Call scraper method
  scraperLookup[webcamName](req, res);
};
