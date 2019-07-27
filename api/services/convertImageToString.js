"use strict";

const axios = require("axios");
const axiosRetry = require("axios-retry");

const winston = require("../config/winston");

module.exports = url =>
  new Promise((resolve, reject) => {
    axiosRetry(axios, { retries: 5 });
    winston.info(`Retrieving image from ${url} - will retry up to 5 times`);

    axios
      .get(url, { responseType: "arraybuffer" })
      .then(res => {
        winston.info("Image retrieved and converted to string");
        const string = `data:image/png;base64,${Buffer.from(
          res.data,
          "binary"
        ).toString("base64")}`;
        resolve(string);
      })
      .catch(err => reject(err));
  });
