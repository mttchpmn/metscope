"use strict";

const winston = require("../../services/winston");
const loadWebcams = require("../../helpers/webcam/loadWebcams");

// TODO - Handle multiple areas in one request
const loadWebcam = async (req, res) => {
  const area = req.params.area;
  area === "all"
    ? winston.info(`Loading all webcams...`)
    : winston.info(`Loading webcams for ${area}...`);

  try {
    const webcams = await loadWebcams(area);

    return res.status(200).json({ data: { webcams } });
  } catch (error) {
    winston.error(`Error: ${error}`);
    return res.status(500).json({ error: "Internal error", data: error });
  }
};

module.exports = loadWebcam;
