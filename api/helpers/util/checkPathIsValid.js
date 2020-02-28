"use strict";

const fsp = require("fs").promises;

module.exports = async path => {
  try {
    await fsp.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};
