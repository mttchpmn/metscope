const moment = require("moment");

const pool = require("../../config/db");
const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");

module.exports = (req, response) => {
  winston.info("Purging webcams");

  let twentyFourHoursAgo = moment.utc().subtract(24, "hours");

  // TODO - iterate through folders and files, check each filename, if old, remove it
  // After removal, remove entry from DB, or other way round???
  // Prolly other way round
  // Should I just add a filename prop to db?  THen when I find old entries, we have the filename to delete directly
  // YUP, that's it
};
