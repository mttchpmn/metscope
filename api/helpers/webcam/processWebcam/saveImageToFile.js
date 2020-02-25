"use strict";

const moment = require("moment");
const axios = require("axios");

const fs = require("fs");
const util = require("util");
const mkDir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

const config = require("../../../../config");

const directoryExists = path => {
  fs.access(path, err => !err);
};

// Given code and url, save webcam image from web to file.
module.exports = async (webcamCode, imageUrl) => {
  const fileName = `${moment.utc().format("YYYYMMDDTHHmm")}Z.jpg`;
  const directory = `${config.imagesPath}/${webcamCode}`;

  try {
    // Create dir if it doesnt exist
    if (!directoryExists(directory)) await mkDir(directory);

    const { data } = await axios.get({
      imageUrl,
      responseType: "arraybuffer",
      timeout: 4000
    });
    const imageBuffer = Buffer.from(data);

    await writeFile(`${directory}/${fileName}`, imageBuffer);

    return fileName;
  } catch (error) {
    throw error;
  }
};
