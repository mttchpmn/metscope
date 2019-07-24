// External imports
const express = require("express");
const cors = require("cors");
const serveIndex = require("serve-index");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Internal imports
require("dotenv").config();
const config = require("./api/config/config");
const winston = require("./api/config/winston");
const withAuth = require("./api/middleware/withAuth");

// Routers and Routes
const authRouter = require("./api/routes/authRouter");
const dataRouter = require("./api/routes/dataRouter");
const utilRouter = require("./api/routes/utilRouter");

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
app.use("/auth", authRouter);
app.use("/data", withAuth, dataRouter);
app.use("/util", utilRouter);
app.use(
  "/images",
  express.static("images"),
  serveIndex("images", { icons: true })
);

// Test endpoint
app.use("/", (req, res) =>
  res.status(200).json({ message: `API online at port ${port}` })
);

// Launch app
winston.info(`API online at port ${port}`);
app.listen(port);

// Export app for test suite
module.exports = app;
