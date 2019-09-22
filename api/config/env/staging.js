"use strict";

module.exports = {
  app: {
    port: process.env.PORT || 4000
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expiry: "7 days"
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
