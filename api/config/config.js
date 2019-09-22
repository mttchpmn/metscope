"use strict";

const winston = require("./winston");
const env = process.env.NODE_ENV || "development";
const config = require(`./env/${env}`);

winston.info(`Using config: ${env}`);
module.exports = config;
