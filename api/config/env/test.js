"use strict";

module.exports = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    user: "metscope",
    host: "localhost",
    database: "metscope",
    password: "password",
    port: process.env.DB_PORT || 5432
  },
  domain: {
    baseUrl: `localhost:${process.env.PORT || 3000}`
  }
};
