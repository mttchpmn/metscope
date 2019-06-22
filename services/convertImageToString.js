const axios = require("axios");

module.exports = async url => {
  return axios
    .get(url, { responseType: "arraybuffer" })
    .then(
      res =>
        `data:image/png;base64,${new Buffer(res.data, "binary").toString(
          "base64"
        )}`
    );
};
