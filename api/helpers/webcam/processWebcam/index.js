"use strict";

const winston = require("../../../services/winston");
const getDynamicImageUrl = require("./getDynamicImageUrl");
const evaluateWebcamForSave = require("./evaluateWebcamForSave");
const saveImageToFile = require("./saveImageToFile");
const saveWebcamToDatabase = require("./saveWebcamToDatabase");

module.exports = async webcam => {
  const { code, originUrl } = webcam;
  let imageUrl;

  try {
    if (!webcam.static) {
      // return;
      imageUrl = await getDynamicImageUrl(webcam);
    } else {
      imageUrl = originUrl;
    }

    const webCamIsNew = await evaluateWebcamForSave(code, imageUrl);

    // Webcam is not new.  Do not continue.
    if (!webCamIsNew) {
      winston.info(`[${code}]: Skipped old webcam`);
      return [code, true];
    }

    // Webcam is new. Save to file and DB.
    const fileName = await saveImageToFile(code, imageUrl);
    await saveWebcamToDatabase(webcam, fileName);
    winston.info(`[${code}]: Saved new webcam`);

    return [code, true];
  } catch (error) {
    winston.error(`[${code}]: ${error}`);

    // Don't throw error here as that will cause controller to return 500 status
    return [code, false];
  }
};
