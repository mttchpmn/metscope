"use strict";

const { createLogger, format, transports } = require("winston");
const { combine, printf, colorize } = format;
const { Loggly } = require("winston-loggly-bulk");
const appRoot = require("app-root-path");

const config = require("../../../config");

const consoleFormat = format.combine(
  colorize({ all: true }),
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const options = {
  console: {
    silent: process.env.NODE_ENV === "test" ? true : false,
    level: config.app.loggingLevel,
    format: consoleFormat,
    handleExceptions: true,
    json: false
  },
  infoFile: {
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.errors({ stack: true }),
      format.splat()
    ),
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true
  },
  errorFile: {
    level: "error",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.errors({ stack: true }),
      format.splat()
    ),
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true
  }
};

const logger = createLogger({
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    new transports.File(options.infoFile),
    new transports.File(options.errorFile)
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
