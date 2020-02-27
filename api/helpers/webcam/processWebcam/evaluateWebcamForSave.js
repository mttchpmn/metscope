"use strict";

const axios = require("axios");

const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const Webcam = require("../../../../database/models").Webcam;
const winston = require("../../../services/winston");

module.exports = async (webcamCode, imageUrl) => {
  winston.debug(`[${webcamCode}]: Evaluating webcam for save...`);
  try {
    const existingWebcam = await Webcam.findOne({
      where: { code: webcamCode },
      order: [["id", "DESC"]]
    });

    // We don't have a local webcam.  Proceed with save.
    if (!existingWebcam) return true;

    // Download image to check against local copy
    const { data } = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 4000
    });

    const existingImageBuffer = await readFile(existingWebcam.location);
    const newImageBuffer = Buffer.from(data);

    // Images are the same. Do not proceed with save.
    if (newImageBuffer.equals(existingImageBuffer)) return false;

    // Image is new.  Proceed with save
    winston.debug(`[${webcamCode}]: Webcam is new. Proceeding with save.`);
    return true;
  } catch (error) {
    throw error;
  }
};
