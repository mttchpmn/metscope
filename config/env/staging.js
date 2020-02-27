"use strict";
const appPath = require("app-root-path");

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    timePeriod: 6,
    staleThreshold: 3,
    viewThreshold: 6,
    purgeThreshold: 12,
    loggingLevel: "info"
  },
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "metscope",
    dialect: "postgres",
    host: "db", // 'db' refers to the database host on the Docker Containers internal network
    port: 5432
  },
  domain: {
    baseUrl: `https://api-int.metscope.com`
  },
  imagesPath: `${appPath}/images`
};
