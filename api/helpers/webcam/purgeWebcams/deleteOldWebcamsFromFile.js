"use strict";

const fsp = require("fs").promises;

module.exports = async oldWebcams => {
  const fileLocations = oldWebcams.map(webcam => webcam.location);

  try {
    // await Promise.all(fileLocations.map(path => fsp.unlink(path)));

    return fileLocations.length;
  } catch (error) {
    throw error;
  }
};
