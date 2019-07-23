const express = require("express");
const router = express.Router();

const scrapeWebcam = require("../controllers/webcam/scrapeWebcam.js");
const purgeWebcams = require("../controllers/webcam/purgeWebcams");

router.get("/webcam/scrape/:name", scrapeWebcam);
router.get("/webcam/purge", purgeWebcams);

module.exports = router;
