"use strict";

// External imports
const express = require("express");

const cors = require("cors");
const serveIndex = require("serve-index");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

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
app.use(morgan("combined", { stream: winston.stream }));
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
  console.log("req.session :", req.session);
  res.status(200).json({ message: `API online at port ${port}` });
});

// Launch app
app.listen(port, () => winston.info(`API online at port ${port}`));

// Export app for test suite
module.exports = app;
