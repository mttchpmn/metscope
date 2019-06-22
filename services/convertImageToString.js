const axios = require("axios");

module.exports = async url => {
  return axios
    .get(url, { responseType: "arraybuffer" })
    .then(res => new Buffer(res.data, "binary").toString("base64"));
};
