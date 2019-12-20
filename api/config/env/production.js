"use strict";

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    timePeriod: 3,
    staleThreshold: 2,
    purgeThreshold: 12
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
    baseUrl: "https://api.metscope.com"
  }
};
