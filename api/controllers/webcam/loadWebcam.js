const pool = require("../../config/db");
const winston = require("../../config/winston");

const loadWebcam = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Loading webcams for ${webcamName}`);

  pool.query(
    "SELECT id, name, date, url, string from webcams where name = $1",
    [webcamName],
    (err, results) => {
      if (err) winston.err(err);

      winston.info(`Found ${results.rowCount} rows`);
      res.status(200).json(results.rows);
    }
  );
};

module.exports = loadWebcam;
