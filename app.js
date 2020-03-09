"use strict";

// External imports
const express = require("express");

const cors = require("cors");
const serveIndex = require("serve-index");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Internal imports
require("dotenv").config();
const config = require("./config/");
const winston = require("./api/services/winston");

// Routers and Routes
const dataRouter = require("./api/routes/data");
const utilRouter = require("./api/routes/util");

// Instantiate app
winston.info(`API starting...`);

const app = express();
const port = config.app.port;

// Setup Middlewares
app.use(morgan("common", { stream: winston.stream }));
app.use(cors()); // This enables CORS for ALL routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Routers
app.use("/util", utilRouter);
app.use("/data", dataRouter);

// Serve images as webpage
app.use(
  "/images",
  express.static("images"),
  serveIndex("images", { icons: true })
);

// Test endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: `API online at port ${port}` });
});

app.get("/test/:area/:code", async (req, res) => {
  const { area, code } = req.params;

  const webcams = require("./config/webcams")[area];
  const processWebcam = require("./api/helpers/webcam/processWebcam");

  winston.info(`[${code}]: Testing webcam...`);

  const cam = webcams.filter(cam => cam.code === req.params.code)[0];

  try {
    await processWebcam(cam);

    return res.status(200).json({ message: "Test complete" });
  } catch (error) {
    res.status(500).json({ error: "Test failed" });
  }
});

// Launch app
app.listen(port, () =>
  winston.info(`[${process.env.NODE_ENV}] API online at port ${port}`)
);

// Export app for test suite
module.exports = app;
