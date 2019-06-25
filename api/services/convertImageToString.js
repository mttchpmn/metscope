const axios = require("axios");
const axiosRetry = require("axios-retry");

module.exports = async url => {
  axiosRetry(axios, { retries: 5 });
  return axios
    .get(url, { responseType: "arraybuffer" })
    .then(
      res =>
        `data:image/png;base64,${Buffer.from(res.data, "binary").toString(
          "base64"
        )}`
    );
};
