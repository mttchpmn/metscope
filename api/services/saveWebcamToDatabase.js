const winston = require("../config/winston");
const pool = require("../config/db");

module.exports = (name, url, string, response) => {
  winston.info(`Attempting to save ${name} webcam to database`);

  // Load last image from DB to check to see if latest image is the same
  pool
    .query(
      "SELECT string FROM webcams WHERE name = $1 ORDER BY id DESC LIMIT 1",
      [name]
    )
    .then(res => {
      // Don't save the image if it already is in the database
      if (res.rowCount && res.rows[0].string === string) {
        winston.info(`Image is the same as latest in db`);

        return response.json({
          status: 200,
          message: "Image already exists in database"
        });
      }

      // Add image to DB if image is new
      pool
        .query("INSERT INTO webcams (name, url, string) VALUES ($1, $2, $3)", [
          name,
          url,
          string
        ])
        .then(res => {
          winston.info(`Image added to db`);
          return response.json({
            status: 201,
            message: "Image added to database"
          });
        })
        .catch(err => {
          winston.error(err);
          return response.json({ status: 500, message: "Internal error" });
        });
    });
};
