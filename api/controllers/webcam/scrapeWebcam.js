const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");
// Import specific scrapers
const scrapeCoronetPeak = require("./webcam_scrapers/coronetPeak");
const scrapeWhareKeaSW = require("./webcam_scrapers/whareKeaSW");
const scrapeWhareKeaW = require("./webcam_scrapers/whareKeaW");
const scrapeWhareKeaNE = require("./webcam_scrapers/whareKeaNE");
const scrapeStatic = require("./webcam_scrapers/static");

// TODO - Better webcam naming conventions

// Translate webcam name to scraper method
const dynamicScrapers = {
  coronet: scrapeCoronetPeak,
  whareKeaSW: scrapeWhareKeaSW,
  whareKeaW: scrapeWhareKeaW,
  whareKeaNE: scrapeWhareKeaNE
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
