const moment = require("moment");

const pool = require("../../config/db");
const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");

const loadWebcam = (req, response) => {
  winston.info(`Loading all webcams`);

  let names;
  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  // Get all webcam names in database
  pool
    .query("SELECT DISTINCT name FROM webcams;")
    .then(results => {
      names = results.rows.map(row => row.name).sort();
      winston.info(`Found all webcam names in database: ${names}`);

      return pool.query(
        `SELECT  id, name, date, url FROM webcams WHERE date > $1 ORDER BY id ASC;`,
        [twentyFourHoursAgo]
      );
    })
    .then(results => results.rows)
    .then(res => {
      let resultArray = names.map(name => {
        let nameObj = {};
        if (webcamList[name]) {
          nameObj.name = name;
          nameObj.title = webcamList[name].title;
          nameObj.desc = webcamList[name].desc;
          nameObj.images = res.filter(i => i.name === name); // TODO - Refactor to be more efficient
        }
        return nameObj;
      });
      return response.json(resultArray);
    })
    .catch(err => winston.error(err));
};

module.exports = loadWebcam;
