"use strict";

const express = require("express");
const router = express.Router();

const loadAllWebcams = require("../controllers/webcam/loadAll");
const loadWebcam = require("../controllers/webcam/load");
const scrapeMetvuw = require("../controllers/weather/scrapeMetvuw");
const scrapeQmug = require("../controllers/weather/scrapeQmug");

/**
 * @swagger
 *
 * /data/webcam/load/all:
 *  get:
 *    description: Load all webcams and return response
 *    tags:
 *      - data
 *    parameters:
 *      - name: X-Authorization
 *        description: JWT bearer token
 *        in: header
 *        required: true
 *        type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Load successful
 *        schema:
 *            type: array
 *            items:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                  code:
 *                    type: string
 *                  desc:
 *                    type: string
 *                  area:
 *                    type: string
 *                  areaCode:
 *                    type: string
 *                  region:
 *                    type: string
 *                  zone:
 *                    type: string
 *                  images:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        name:
 *                          type: string
 *                        date:
 *                          type: string
 *                        url:
 *                          type: string
 *                        location:
 *                          type: string
 *                        createdAt:
 *                          type: string
 *                        updatedAt:
 *                          type: string
 *      401:
 *          description: Authentication Error
 *      500:
 *        description: Internal Error
 */
router.get("/webcam/load/all", loadAllWebcams);

/**
 * @swagger
 *
 * /data/webcam/load/{code}:
 *  get:
 *    description: Load all webcams and return response
 *    tags:
 *      - data
 *    parameters:
 *      - name: X-Authorization
 *        description: JWT bearer token
 *        in: header
 *        required: true
 *        type: string
 *      - name: code
 *        description: Webcam code e.g. 'cy_glenorchyTownship'
 *        in: path
 *        required: true
 *        type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Load successful
 *        schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                code:
 *                  type: string
 *                desc:
 *                  type: string
 *                area:
 *                  type: string
 *                areaCode:
 *                  type: string
 *                region:
 *                  type: string
 *                zone:
 *                  type: string
 *                images:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      name:
 *                        type: string
 *                      date:
 *                        type: string
 *                      url:
 *                        type: string
 *                      location:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                      updatedAt:
 *                        type: string
 *      401:
 *          description: Authentication Error
 *      500:
 *        description: Internal Error
 */
router.get("/webcam/load/:name", loadWebcam);

/**
 * @swagger
 *
 * /data/weather/load/metvuw/{area}:
 *  get:
 *    description: Load all metvuw images for {area}
 *    tags:
 *      - data
 *    parameters:
 *      - name: X-Authorization
 *        description: JWT bearer token
 *        in: header
 *        required: true
 *        type: string
 *      - name: area
 *        description: Forecast area
 *        in: path
 *        required: true
 *        type: string
 *        enum:
 *          - nz
 *          - nzsi
 *          - nzni
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Load successful
 *        schema:
 *              type: object
 *              properties:
 *                images:
 *                  type: array
 *                  items:
 *                    type: string
 *      401:
 *          description: Authentication Error
 *      500:
 *        description: Internal Error
 */
router.get("/weather/load/metvuw/:area", scrapeMetvuw);

/**
 * @swagger
 *
 * /data/weather/load/qmug:
 *  get:
 *    description: Load QMUG weather data
 *    tags:
 *      - data
 *    parameters:
 *      - name: X-Authorization
 *        description: JWT bearer token
 *        in: header
 *        required: true
 *        type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Load successful
 *        schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                      sigmet:
 *                          type: array
 *                          items:
 *                              type: string
 *                      taf:
 *                        type: array
 *                        items:
 *                          type: string
 *                      aaw:
 *                        type: array
 *                        items:
 *                          type: string
 *                      grafor:
 *                        type: array
 *                        items:
 *                          type: string
 *                      sigwx:
 *                        type: array
 *                        items:
 *                           type: string
 *                      metar:
 *                        type: array
 *                        items:
 *                          type: string
 *      401:
 *          description: Authentication Error
 *      500:
 *        description: Internal Error
 */
router.get("/weather/load/qmug", scrapeQmug);

module.exports = router;
