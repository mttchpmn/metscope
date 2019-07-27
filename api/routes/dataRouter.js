"use strict";

const express = require("express");
const router = express.Router();

const loadAllWebcams = require("../controllers/webcam/loadAll");
const loadWebcam = require("../controllers/webcam/load");
const scrapeMetvuw = require("../controllers/weather/scrapeMetvuw");
const scrapeQmug = require("../controllers/weather/scrapeQmug");

router.get("/webcam/load/all", loadAllWebcams);
router.get("/webcam/load/:name", loadWebcam);

router.get("/weather/load/metvuw/:area", scrapeMetvuw);
router.get("/weather/load/qmug", scrapeQmug);

module.exports = router;
