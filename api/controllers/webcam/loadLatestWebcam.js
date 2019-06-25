const pool = require("../../config/db");

const loadLatestWebcam = (req, res) => {
  const webcamName = req.params.name;
  pool.query(
    "SELECT id, name, url, string from webcams where name = $1 LIMIT 1",
    [webcamName],
    (err, results) => {
      if (err) throw err;

      res.set("Content-Type", "text/html");
      res.send(Buffer.from(`<img src="${results.rows[0].string}" />`));
    }
  );
};

module.exports = loadLatestWebcam;
