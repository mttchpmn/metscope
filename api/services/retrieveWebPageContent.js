"use strict";

const axios = require("axios");
const axiosRetry = require("axios-retry");

const winston = require("../config/winston");

module.exports = (url, retryCount) => {
  winston.info(`Retrieving web page at ${url}`);
  if (retryCount) {
    axiosRetry(axios, { retries: retryCount });
    winston.info(`Will retry up to ${retryCount} times`);
  }

  return (
    axios
      .get(url)
      .then(res => {
        winston.info("Request successful");
        return {
          status: res.status, // Status code e.g. 200
          content: res.data // Html page content
        };
      })
      // TODO - Fix why this catch block never seems to get hit
      .catch(err => {
        winston.err("Request unsuccessful");
        return "foo";
      })
  );
};
