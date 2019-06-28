const winston = require("../../config/winston");

module.exports = (req, response) => {
  winston.info("Purging webcams");
};
