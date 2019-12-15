"use strict";

const retrieveIfisBrief = require("../../services/retrieveIfisBrief");

module.exports = async (req, response) => {
  const brief = await retrieveIfisBrief();

  return response.status(200).json({ data: brief });
};
