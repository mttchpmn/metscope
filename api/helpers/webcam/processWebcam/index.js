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
      imageUrl = await getDynamicImageUrl(webcam);
    } else {
      imageUrl = originUrl;
    }

    const webCamIsNew = await evaluateWebcamForSave(code, imageUrl);

    // Webcam is not new.  Do not continue.
    if (!webCamIsNew) {
      winston.info(`[${code}]: Skipped old webcam`);
      return;
    }

    // Webcam is new. Save to file and DB.
    const fileName = await saveImageToFile(code, imageUrl);
    await saveWebcamToDatabase(webcam, fileName);
    winston.info(`[${code}]: Saved new webcam`);

    return;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      winston.error(`[${code}]: No scraper module.`);

      return;
    }
    winston.error(`[${code}]: ${error}`);

    return;
  }
};
