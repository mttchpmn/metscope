"use strict";

const winston = require("../../../services/winston");
const getDynamicContent = require("./getDynamicContent");
const getStaticContent = require("./getStaticContent");

module.exports = async (url, dynamic) => {
  winston.debug(`Retrieving ${contentType} web content from ${url}...`);

  try {
    if (dynamic) return getDynamicContent(url);
    return getStaticContent(url);
  } catch (error) {
    winston.error(`Error retrieving content from ${url}`);
  }
};
