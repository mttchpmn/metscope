"use strict";

const winston = require("../../../services/winston");
const evaluateWebcamForSave = require("./evaluateWebcamForSave");
const saveImageToFile = require("./saveImageToFile");
const saveWebcamToDatabase = require("./saveWebcamToDatabase");

// Given webcam code, and url of webcam image, check first if we already have webcam in db,
// and if so, check if image is new.  If image is new, or we don't have copy in db, save image to file,
// and save to db
module.exports = async (webcamCode, imageUrl) => {
  try {
    const proceedWithSave = await evaluateWebcamForSave(webcamCode);

    // Webcam is not new.  Do not continue.
    if (!proceedWithSave) return;

    // Webcam is new. Save to file and DB.
    const fileName = await saveImageToFile(webcamCode, imageUrl);
    await saveWebcamToDatabase(webcamCode, fileName);
  } catch (error) {
    winston.error(`[${webcamCode}]: Error processing webcam: ${error.message}`);
  }
};
