"use strict";

const axios = require("axios");

const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const Webcam = require("../../../../database/models").Webcam;

module.exports = async (webcamCode, imageUrl) => {
  try {
    const existingWebcam = await Webcam.findOne({
      where: { name: webcamCode },
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
    return true;
  } catch (error) {
    throw error;
  }
};
