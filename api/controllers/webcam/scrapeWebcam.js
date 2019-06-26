const winston = require("../../config/winston");
// Import specific scrapers
const scrapeCoronetPeak = require("./webcam_scrapers/coronetPeak");
const scrapeWhareKeaSW = require("./webcam_scrapers/whareKeaSW");
const scrapeWhareKeaW = require("./webcam_scrapers/whareKeaW");
const scrapeWhareKeaNE = require("./webcam_scrapers/whareKeaNE");
const scrapeStatic = require("./webcam_scrapers/static");

// TODO - Better webcam naming conventions

// Translate webcam name to scraper method
const scraperLookup = {
  coronet: scrapeCoronetPeak,
  whareKeaSW: scrapeWhareKeaSW,
  whareKeaW: scrapeWhareKeaW,
  whareKeaNE: scrapeWhareKeaNE,
  fernhill: "https://www.queenstown.com/cams/aspen.jpg",
  cecilPeakW:
    "http://www.jablotool.com/Components/EYE02/StoredImage.ashx?id=QXG2A2FXGT&index=1",
  cecilPeakN:
    "http://www.jablotool.com/Components/EYE02/StoredImage.ashx?id=H1H1ISJWPU&index=1",
  mtNicholas: "http://58.84.48.53:1080/172.23.16.201/cover/1.jpg",
  glenorchy: "https://www.snowgrass.co.nz/cust/glenorchy_air/images/webcam.jpg",
  homer: "https://metdata.net.nz/SH94/camera/41/image.php",
  mackinnon: "https://metdata.net.nz/doc/mackinnon/cam1/image.php",
  stAnne: "https://metdata.net.nz/es/stanne/cam1/image.php",
  milfordRJ: "http://snapithd.com/static/milford.jpg",
  milfordSD:
    "https://www.southerndiscoveries.co.nz/webcam-images/terminal/webcam1.jpg",
  milfordSW:
    "http://webcam.realjourneys.co.nz/watermark.php?source=mfdwebcam3.jpg"
};

module.exports = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Scraping webcam for ${webcamName}`);

  // Call scraper method
  typeof scraperLookup[webcamName] === "string"
    ? scrapeStatic(webcamName, scraperLookup[webcamName], req, res)
    : scraperLookup[webcamName](req, res);
};
