// External imports
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Internal imports
const config = require("./api/config/config");
const winston = require("./api/config/winston");

// Instantiate app
winston.info(`API starting...`);
const app = express();
const port = config.app.port;

// Setup Middlewares
app.use(morgan("combined", { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Instantiate API endpoints
require("./api/config/routes")(app);

// Launch app
winston.info(`API online at port ${port}`);
app.listen(port);
