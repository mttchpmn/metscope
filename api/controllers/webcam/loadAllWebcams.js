const pool = require("../../config/db");
const winston = require("../../config/winston");

const loadWebcam = (req, res) => {
  winston.info(`Loading all webcams`);

  //   console.log("req :", req);
  let names;
  let resultObject = {};

  // Get all webcam names in database
  pool
    .query("SELECT DISTINCT name FROM webcams;")
    .then(results => {
      names = results.rows.map(row => row.name);
      winston.info(`Found all webcam names in database: ${names}`);
    })
    .catch(err => winston.error(err));
};

module.exports = loadWebcam;
