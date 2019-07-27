"use strict";

const express = require("express");
const router = express.Router();

const scrapeWebcam = require("../controllers/webcam/scrape.js");
const purgeWebcams = require("../controllers/webcam/purge");

router.get("/webcam/scrape/:name", scrapeWebcam);
router.get("/webcam/purge", purgeWebcams);

module.exports = router;
