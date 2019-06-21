const getGlenorchy = require("./webcam_scrapers/glenorchy");

const scraperLookup = {
  glenorchy: getGlenorchy
};

const scrapeWebcam = (req, res) => {
  const webcamName = req.params.name;

  scraperLookup[webcamName]();
};

module.exports = scrapeWebcam;
