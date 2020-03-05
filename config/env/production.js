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
  domain: {
    baseUrl: `https://api.metscope.com`
  },
  imagesPath: `${appPath}/images`
};
