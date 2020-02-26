"use strict";

const moment = require("moment");
const axios = require("axios");

const fs = require("fs");
const fsp = require("fs").promises;
const util = require("util");
const mkDir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

const config = require("../../../../config");

const directoryExists = async path => {
  try {
    await fsp.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

// Given code and url, save webcam image from web to file.
module.exports = async (webcamCode, imageUrl) => {
  const fileName = `${moment.utc().format("YYYYMMDDTHHmm")}Z.jpg`;
  const directory = `${config.imagesPath}/${webcamCode}`;
  const dirExists = await directoryExists(directory);

  try {
    // Create dir if it doesnt exist
    if (!dirExists) {
      await fsp.mkdir(directory);
    }

    const { data } = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 4000
    });

    const imageBuffer = Buffer.from(data);

    await fsp.writeFile(`${directory}/${fileName}`, imageBuffer);

    return fileName;
  } catch (error) {
    throw error;
  }
};
