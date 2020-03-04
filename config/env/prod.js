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
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "metscope",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    maxConnections: 5
  },
  domain: {
    baseUrl: `https://api.metscope.com`
  },
  imagesPath: `${appPath}/images`
};
