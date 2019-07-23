const express = require("express");
const router = express.Router();

const loadAllWebcams = require("../controllers/webcam/loadAllWebcams");
const loadWebcam = require("../controllers/webcam/loadWebcam");
const scrapeMetvuw = require("../controllers/weather/scrapeMetvuw");
const scrapeQmug = require("../controllers/weather/scrapeQmug");

router.get("/webcam/load/all", loadAllWebcams);
router.get("/webcam/load/:name", loadWebcam);

router.get("/weather/load/metvuw/:area", scrapeMetvuw);
router.get("/weather/load/qmug", scrapeQmug);

module.exports = router;
