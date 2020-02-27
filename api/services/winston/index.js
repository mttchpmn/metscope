"use strict";

const { createLogger, format, transports } = require("winston");
const { combine, printf } = format;
const { Loggly } = require("winston-loggly-bulk");
const appRoot = require("app-root-path");

const config = require("../../../config");

const consoleFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${level.toUpperCase()}]: ${message}`
);

const options = {
  file: {
    silent: process.env.NODE_ENV === "test" ? true : false,
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxFiles: 5,
    colorize: false
  },
  console: {
    silent: process.env.NODE_ENV === "test" ? true : false,
    level: config.app.loggingLevel,
    format: combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      consoleFormat
    ),
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false
});

if (process.env.NODE_ENV === "production") {
  logger.add(
    new Loggly({
      token: process.env.LOGGLY_TOKEN,
      subdomain: "metscope",
      tags: ["METSCOPE"],
      json: true
    })
  );
}

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
