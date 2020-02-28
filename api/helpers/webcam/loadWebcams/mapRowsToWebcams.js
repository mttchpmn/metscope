"use strict";

const webcamList = require("../../../../config/webcams");

module.exports = async (area, rows) => {
  const webcams = webcamList[area];

  for (const w of webcams) {
    const images = rows.filter(row => row.code === w.code);
    w.images = images;
  }

  return webcams;
};
