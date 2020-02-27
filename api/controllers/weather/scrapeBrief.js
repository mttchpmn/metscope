"use strict";

const moment = require("moment");

const winston = require("../../services/winston");
const retrieveBrief = require("../../helpers/weather/retrieveBrief");
const Brief = require("../../../database/models").Brief;

module.exports = async (req, response) => {
  const brief = await retrieveBrief();

  await Brief.create({
    identifier: brief.info.identifier,
    date: brief.info.issueDate,
    from: brief.info.validFrom,
    to: brief.info.validTo,
    info: brief.info,
    aerodromes: brief.aerodromes,
    aaw: brief.aaw,
    sigmet: brief.sigmet,
    charts: brief.charts
  });
  winston.info(
    `IFIS brief added to database successfully with identifier: ${brief.info.identifier}`
  );

  return response
    .status(200)
    .json({ data: { message: "Brief saved successfully" } });
};
