"use strict";

const express = require("express");
const router = express.Router();

// const scrapeWebcam = require("../controllers/webcam/scrape.js");
const scrapeArea = require("../controllers/webcam/scrapeArea.js");
const scrapeAllWebcams = require("../controllers/webcam/scrapeAll.js");
const purgeWebcams = require("../controllers/webcam/purge");
const scrapeBrief = require("../controllers/weather/scrapeBrief");

router.get("/webcam/scrape/all", scrapeAllWebcams);

router.get("/webcam/scrape/:area", scrapeArea);

router.get("/webcam/purge", purgeWebcams);

router.get("/weather/scrape/brief", scrapeBrief);

module.exports = router;
