"use strict";

const processWebcam = require("../../../services/processWebcam");

module.exports = (code, originUrl) => {
  return processWebcam(code, originUrl);
};
