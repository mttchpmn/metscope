"use strict";

const express = require("express");
const router = express.Router();

const loadWebcams = require("../controllers/webcam/load");
const loadBrief = require("../controllers/weather/loadBrief");
const loadMetvuw = require("../controllers/weather/scrapeMetvuw");

router.get("/webcam/load/:area", loadWebcams);

router.get("/weather/load/metvuw/:area", loadMetvuw);

router.get("/weather/load/brief", loadBrief);

module.exports = router;
