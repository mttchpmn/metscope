"use strict";

const winston = require("../../services/winston");
const loadWebcams = require("../../helpers/webcam/loadWebcams");
const webcamList = require("../../../config/webcams");

module.exports = async (req, res) => {
  const areasString = req.params.areas;

  let areas;
  if (areasString === "all") {
    areas = Object.keys(webcamList);
    winston.info(`Loading all webcams...`);
  } else {
    areas = areasString.split("&");
    winston.info(`Loading webcams for ${areas.join(", ")}...`);
  }

  try {
    const result = await Promise.all(areas.map(area => loadWebcams(area)));
    let webcams = {};
    for (let r of result) {
      webcams[r.area] = r.webcams;
    }

    return res.status(200).json({ data: { webcams } });
  } catch (error) {
    winston.error(`Error: ${error}`);

    return res.status(500).json({ error: "Internal error", data: error });
  }
};
