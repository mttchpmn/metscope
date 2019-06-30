const moment = require("moment");
const fs = require("fs");
const util = require("util");

const pool = require("../../config/db");
const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");

const deleteFile = util.promisify(fs.unlink);

module.exports = (req, response) => {
  winston.info("Purging webcams");

  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  pool
    .query("SELECT id, location FROM webcams WHERE date < $1", [
      twentyFourHoursAgo
    ])
    .then(results => {
      winston.info(
        `Found ${results.rowCount} rows in the database that will be deleted`
      );
      return results.rows
        .map(item => item.location)
        .filter(item => item !== null);
    })
    .then(filesToDelete => {
      winston.info("The following files will be deleted:");
      winston.info(filesToDelete);
      return Promise.all(filesToDelete.map(filePath => deleteFile(filePath)));
    })
    .then(res => {
      winston.info("Files deleted successfully");
      return pool
        .query(
          "DELETE FROM webcams WHERE id IN (SELECT id FROM webcams WHERE date < $1)",
          [twentyFourHoursAgo]
        )
        .then(results => {
          winston.info(`Deleted ${results.rowCount} rows from the database`);
          return response.json({
            status: 200,
            message: "Webcams purged successfully"
          });
        })
        .catch(err => {
          winston.error(err);
          return response.json({ status: 500, message: "Internal error" });
        });
    });
};
