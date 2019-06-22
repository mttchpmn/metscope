const axios = require("axios");

module.exports = url => {
  return axios.get(url).then(res => {
    return {
      status: res.status, // Status code e.g. 200
      content: res.data // Html page content
    };
  });
};
