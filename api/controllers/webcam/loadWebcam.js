const pool = require("../../config/db");

const loadWebcam = (req, res) => {
  const webcamName = req.params.name;
  pool.query(
    "SELECT id, name, url, string from webcams where name = $1",
    [webcamName],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = loadWebcam;
