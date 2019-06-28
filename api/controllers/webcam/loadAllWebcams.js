const moment = require("moment");

const pool = require("../../config/db");
const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");

const loadWebcam = (req, response) => {
  winston.info(`Loading all webcams`);

  //   console.log("req :", req);
  let names;
  let resultObject = {};
  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  // Get all webcam names in database
  pool
    .query("SELECT DISTINCT name FROM webcams;")
    .then(results => {
      names = results.rows.map(row => row.name);
      winston.info(`Found all webcam names in database: ${names}`);

      Promise.all(
        names.map(name =>
          pool
            .query(
              `SELECT  id, name, date, url FROM webcams WHERE name = $1 and date > $2 ORDER BY id DESC`,
              [name, twentyFourHoursAgo]
            )
            .then(results => results.rows)
        )
      ).then(res => {
        names.map((name, index) => {
          // Only return data for webcams we hvae defined
          if (webcamList[name]) {
            resultObject[name] = {};
            resultObject[name].title = webcamList[name].title;
            resultObject[name].images = res[index];
            resultObject[name].desc = webcamList[name].desc;
          }
        });
        return response.json(resultObject);
      });
    })
    .catch(err => winston.error(err));
};

module.exports = loadWebcam;
