"use strict";

const express = require("express");
const router = express.Router();

const loadAllWebcams = require("../controllers/webcam/loadAll");
const loadWebcam = require("../controllers/webcam/load");
const loadBrief = require("../controllers/weather/loadBrief");
const scrapeMetvuw = require("../controllers/weather/scrapeMetvuw");

router.get("/webcam/load/all", loadAllWebcams);

router.get("/webcam/load/:area", loadWebcam);

router.get("/weather/load/metvuw/:area", scrapeMetvuw);

router.get("/weather/load/brief", loadBrief);

module.exports = router;
