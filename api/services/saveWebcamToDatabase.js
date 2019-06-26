const moment = require("moment");
const fs = require("fs");
const appPath = require("app-root-path");

const config = require("../config/config");
const winston = require("../config/winston");
const pool = require("../config/db");
const saveImage = require("../services/saveImageToFile");

module.exports = (name, downloadUrl, string, response) => {
  winston.info(`Attempting to save ${name} webcam to database`);

  const savedDate = moment.utc().format();
  const fileName = `${moment.utc().format("YYYYMMDDTHHmm")}Z.jpg`;
  const hostedUrl = `${config.domain.baseUrl}/images/${name}/${fileName}`;

  // Load last image from DB to check to see if latest image is the same
  pool
    .query(
      "SELECT string FROM webcams WHERE name = $1 ORDER BY id DESC LIMIT 1",
      [name]
    )
    .then(res => {
      // Don't save the image if it already is in the database
      if (res.rowCount && res.rows[0].string === string) {
        winston.info(`Image is the same as most recent in database`);

        return response.json({
          status: 200,
          message: "Image already exists in database"
        });
      }

      // Add image to DB if image is new
      pool
        .query(
          "INSERT INTO webcams (name, url, string, date) VALUES ($1, $2, $3, $4)",
          [name, hostedUrl, string, savedDate]
        )
        .then(res => {
          saveImage(name, downloadUrl, fileName); // TODO - Introduce a .then(from the underlying function to log success)

          winston.info(`Image added to database with date: ${savedDate}`);
          return response.json({
            status: 201,
            message: `Image added to database with date: ${savedDate}`
          });
        })
        .catch(err => {
          console.log("ERROR:\n", err);
          // winston.error(err);
          return response.json({ status: 500, message: "Internal error" });
        });
    });
};
