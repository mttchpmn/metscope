"use strict";

module.exports = {
  app: {
    port: process.env.PORT || 4000,
    timePeriod: 6,
    staleThreshold: 3,
    purgeThreshold: 12
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expiry: "7 days"
  },
  session: {
    name: "sid",
    secret: process.env.SESSION_SECRET,
    lifetime: 1000 * 60 * 60 * 7
  },
  db: {
    username: process.env.DB_USER || "metscope",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "metscope",
    dialect: "postgres",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    maxConnections: 5
  },
  domain: {
    baseUrl: "https://api-int.metscope.com"
  }
};
