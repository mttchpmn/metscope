"use strict";

const axios = require("axios");
const axiosRetry = require("axios-retry");

const winston = require("../../../services/winston");

module.exports = async (url, retryCount) => {
  if (retryCount) {
    axiosRetry(axios, { retries: retryCount });
    winston.debug(`\tWill retry up to ${retryCount} times`);
  }

  try {
    const { data } = await axios.get(url, { timeout: 5000 });

    return data;
  } catch (error) {
    throw error;
  }
};
