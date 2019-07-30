"use strict";

module.exports = {
  app: {
    port: 4000
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
    baseUrl: `http://localhost:${4000}`
  }
};
