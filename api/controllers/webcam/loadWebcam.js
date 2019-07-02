const moment = require("moment");

const pool = require("../../config/db");
const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");

const loadWebcam = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Loading webcams for ${webcamName}`);

  if (!webcamList[webcamName]) {
    return res
      .status(404)
      .json({ status: 404, message: `Webcam: ${webcamName} not found` });
  }

  let responseObj = {
    name: webcamName,
    title: webcamList[webcamName].title,
    desc: webcamList[webcamName].desc
  };

  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  pool
    .query(
      "SELECT id, name, date, url FROM webcams WHERE name = $1 and date > $2 ORDER BY id ASC",
      [webcamName, twentyFourHoursAgo]
    )
    .then(results => {
      winston.info(`Found ${results.rowCount} rows`);
      responseObj.images = results.rows;
      res.status(200).json(responseObj);
    })
    .catch(err => winston.error(err));
};

module.exports = loadWebcam;
