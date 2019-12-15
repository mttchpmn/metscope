"use strict";

const express = require("express");
const router = express.Router();

// const scrapeWebcam = require("../controllers/webcam/scrape.js");
const scrapeArea = require("../controllers/webcam/scrapeArea.js");
const scrapeAllWebcams = require("../controllers/webcam/scrapeAll.js");
const purgeWebcams = require("../controllers/webcam/purge");
const scrapeIfis = require("../controllers/weather/scrapeIfis");

/**
 * @swagger
 *
 * /util/webcam/scrape/all:
 *  get:
 *    description: Scrape all webcams and save to database
 *    tags:
 *      - utility
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Scraping successful
 *      500:
 *        description: Internal Error
 */
router.get("/webcam/scrape/all", scrapeAllWebcams);

/**
 * @swagger
 *
 * /util/webcam/scrape/{code}:
 *  get:
 *    description: Scrape specific webcam and save to database
 *    tags:
 *      - utility
 *    parameters:
 *      - name: code
 *        description: Webcam code e.g. 'cy_glenorchyTownship'
 *        in: path
 *        required: true
 *        type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Scraping successful
 *      500:
 *        description: Internal Error
 */
router.get("/webcam/scrape/:area", scrapeArea);

/**
 * @swagger
 *
 * /util/webcam/purge:
 *  get:
 *    description: Purges all webcams older than 24 hours from database
 *    tags:
 *      - utility
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Purge successful
 *      500:
 *        description: Internal Error
 */
router.get("/webcam/purge", purgeWebcams);

router.get("/weather/scrape/ifis", scrapeIfis);

module.exports = router;
