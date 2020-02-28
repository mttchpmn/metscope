"use strict";

const winston = require("../../services/winston");
const loadWebcams = require("../../helpers/webcam/loadWebcams");

const loadWebcam = async (req, res) => {
  const area = req.params.area;
  winston.info(`Loading webcams for ${area}...`);

  try {
    const data = await loadWebcams(area);

    return res.status(200).json({ data });
  } catch (error) {
    winston.error(`Error: ${error}`);
    return res.status(500).json({ error: "Internal error", data: error });
  }
};

module.exports = loadWebcam;
