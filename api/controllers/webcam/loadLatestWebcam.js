const pool = require("../../config/db");
const winston = require("../../config/winston");

const loadLatestWebcam = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Loading latest webcam for ${webcamName}`);

  pool
    .query(
      "SELECT id, name, url, string from webcams where name = $1 ORDER BY id DESC LIMIT 1",
      [webcamName]
    )
    .then(results => {
      winston.info("Webcam loaded successfully");
      res.set("Content-Type", "text/html");
      res.send(Buffer.from(`<img src="${results.rows[0].string}" />`));
    })
    .catch(err => winston.error(err));
};

module.exports = loadLatestWebcam;
