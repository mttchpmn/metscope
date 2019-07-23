const moment = require("moment");
const fs = require("fs");
const util = require("util");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const pool = require("../../config/db");
const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");
const Webcam = require("../../../database/models").Webcam;

const deleteFile = util.promisify(fs.unlink);

module.exports = (req, response) => {
  winston.info("Purging webcams");

  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  // pool
  //   .query("SELECT id, location FROM webcams WHERE date < $1", [
  //     twentyFourHoursAgo
  //   ])

  Webcam.findAll({ where: { date: { [Op.gt]: twentyFourHoursAgo } } })
    .then(webcams => {
      winston.info(
        `Found ${webcams.length} rows in the database that will be deleted`
      );
      return webcams.map(item => item.location).filter(item => item !== null);
    })
    .then(filesToDelete => {
      winston.info("The following files will be deleted:");
      winston.info(filesToDelete);
      return Promise.all(filesToDelete.map(filePath => deleteFile(filePath)));
    })
    .then(() => {
      winston.info("Files deleted successfully");
      return Webcam.findAll({
        where: { date: { [Op.lt]: twentyFourHoursAgo } },
        attributes: ["id"]
      });
    })
    .then(idList => {
      // return pool
      //   .query(
      //     "DELETE FROM webcams WHERE id IN (SELECT id FROM webcams WHERE date < $1)",
      //     [twentyFourHoursAgo]
      //   )
      winston.info(`Will delete ${idList.length} rows from the database`);
      return Webcam.destroy({ where: { id: idList } })
        .then(() => {
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
