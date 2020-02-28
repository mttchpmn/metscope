"use strict";

const moment = require("moment");
const axios = require("axios");
const fsp = require("fs").promises;

const checkPathIsValid = require("../../util/checkPathIsValid");
const config = require("../../../../config");
const winston = require("../../../services/winston");

module.exports = async (webcamCode, imageUrl) => {
  winston.debug(`[${webcamCode}]: Saving webcam to file...`);

  const fileName = `${moment.utc().format("YYYYMMDDTHHmm")}Z.jpg`;
  const dirPath = `${config.imagesPath}/${webcamCode}`;
  const dirExists = await checkPathIsValid(dirPath);

  try {
    // Create dir if it doesnt exist
    if (!dirExists) {
      await fsp.mkdir(dirPath);
    }

    const { data } = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 5000
    });

    const imageBuffer = Buffer.from(data);

    await fsp.writeFile(`${dirPath}/${fileName}`, imageBuffer);

    winston.debug(
      `[${webcamCode}]: Webcam saved to file with filename: ${fileName}`
    );
    return fileName;
  } catch (error) {
    throw error;
  }
};
