"use strict";

module.exports = {
  app: {
    port: process.env.PORT || 3000
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
