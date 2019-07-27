"use strict";

const cheerio = require("cheerio");

const winston = require("../../config/winston");
const getPage = require("../../services/retrieveWebPageContent");

const urlLookup = {
  nz: "http://metvuw.com/forecast/forecast.php?type=rain&region=nz&noofdays=10",
  nzsi:
    "http://metvuw.com/forecast/forecast.php?type=rain&region=nzsi&noofdays=10",
  nzni:
    "http://metvuw.com/forecast/forecast.php?type=rain&region=nzni&noofdays=10"
};

module.exports = (req, response) => {
  winston.info(`Scraping MetVUW charts for ${req.params.area}`);
  const url = urlLookup[req.params.area];

  getPage(url).then(res => {
    const $ = cheerio.load(res.content);
    let links = [];

    $("img").each((i, elem) => {
      if (elem.attribs.src.includes("rain"))
        links.push(`http://metvuw.com/forecast/${elem.attribs.src.slice(2)}`);
    });

    return response.json({ images: links });
  });
};
