const swaggerJSDoc = require("swagger-jsdoc");
const config = require("./config");

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "MetScope API",
      version: "1.0.0"
    },
    host: config.domain.baseUrl,
    // basePath: "/v1",
    schemes: ["http", "https"],
    consumes: ["application/json", "application/x-www-form-urlencoded"],
    produces: ["application/json"]
  },
  apis: ["./api/routes/*.js"]
};

module.exports = swaggerJSDoc(options);
