"use strict";

const getRowsFromDatabase = require("./getRowsFromDatabase");
const mapRowsToWebcams = require("./mapRowsToWebcams");

module.exports = async area => {
  const rows = await getRowsFromDatabase(area);
  const responseData = await mapRowsToWebcams(area, rows);

  return responseData;
};
