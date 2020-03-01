"use strict";

const getRowsFromDatabase = require("./getRowsFromDatabase");
const mapRowsToWebcams = require("./mapRowsToWebcams");

module.exports = async area => {
  const rows = await getRowsFromDatabase(area);
  const webcams = await mapRowsToWebcams(area, rows);

  return { area, webcams };
};
