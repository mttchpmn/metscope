const moment = require("moment");

const pool = require("../../config/db");
const winston = require("../../config/winston");

const loadWebcam = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Loading webcams for ${webcamName}`);

  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  pool.query(
    "SELECT id, name, date, url, string FROM webcams WHERE name = $1 and date > $2 ORDER BY id DESC",
    [webcamName, twentyFourHoursAgo],
    (err, results) => {
      if (err) winston.err(err);

      winston.info(`Found ${results.rowCount} rows`);
      res.status(200).json(results.rows);
    }
  );
};

module.exports = loadWebcam;
