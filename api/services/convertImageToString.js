const axios = require("axios");
const axiosRetry = require("axios-retry");

const winston = require("../config/winston");

module.exports = async url => {
  axiosRetry(axios, { retries: 5 });
  winston.info(`Retrieving image from ${url} - will retry up to 5 times`);

  return axios
    .get(url, { responseType: "arraybuffer" })
    .then(res => {
      winston.info("Image retrieved and converted to string");

      return `data:image/png;base64,${Buffer.from(res.data, "binary").toString(
        "base64"
      )}`;
    })
    .catch(err => winston.error(err));
};
