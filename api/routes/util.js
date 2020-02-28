"use strict";

const express = require("express");
const router = express.Router();

const scrapeWebcams = require("../controllers/webcam/scrape.js");
const purgeWebcams = require("../controllers/webcam/purge");
const scrapeBrief = require("../controllers/weather/scrapeBrief");

router.get("/webcam/scrape/:area", scrapeWebcams);

router.get("/webcam/purge", purgeWebcams);

router.get("/weather/scrape/brief", scrapeBrief);

module.exports = router;
