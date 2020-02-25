"use strict";

const winston = require("./api/services/winston");
const env = process.env.NODE_ENV || "dev";
const config = require(`./env/${env}`);

winston.info(`Using config: ${env}`);
module.exports = config;
