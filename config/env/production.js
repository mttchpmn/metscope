"use strict";
const appPath = require("app-root-path");

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    timePeriod: 3,
    staleThreshold: 3,
    viewThreshold: 6,
    purgeThreshold: 12,
    loggingLevel: "info"
  },
  db: {
    user: process.env.DB_USER || "metscope",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "metscope",
    dialect: "postgres",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    maxConnections: 5,
    logging: false
  },
  domain: {
    baseUrl: `https://api.metscope.com`
  },
  imagesPath: `${appPath}/images`
};
