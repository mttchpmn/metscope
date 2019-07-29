const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "MetScope API",
      version: "1.0.0"
    }
  },
  apis: ["./api/routes/*.js"]
};

module.exports = swaggerJSDoc(options);
