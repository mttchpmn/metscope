"use strict";

const env = process.env.NODE_ENV || "dev";
const config = require(`./env/${env}`);

module.exports = config;
