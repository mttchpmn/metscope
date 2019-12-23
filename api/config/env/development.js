"use strict";

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    timePeriod: 6,
    staleThreshold: 3,
    purgeThreshold: 12
  },
  token: {
    secret: "ivegotalovelybunchofcoconuts",
    expiry: "7 days"
  },
  db: {
    username: "metscope",
    password: "password",
    database: "metscope",
    dialect: "postgres",
    host: "db", // 'db' refers to the database host on the Docker Containers internal network
    port: 5432
  },
  domain: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`
  }
};
