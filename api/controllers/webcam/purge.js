"use strict";

const moment = require("moment");
const fs = require("fs");
const util = require("util");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const winston = require("../../services/winston");
const Webcam = require("../../../database/models").Webcam;
const purgeWebcams = require("../../helpers/webcam/purgeWebcams");

const deleteFile = util.promisify(fs.unlink);

module.exports = async (req, res) => {
  winston.info("Purging webcams...");
  try {
    const purgeObject = await purgeWebcams();
    winston.info(
      `Purged ${purgeObject.oldWebcams} webcams.\n\tDeleted ${purgeObject.fileDeletions} webcams from file.\n\tDeleted ${purgeObject.dbDeletions} webcams from database.`
    );

    return res.status(200).json({
      message: `Purged webcams successfully.`,
      data: purgeObject
    });
  } catch (error) {
    winston.error(error);

    return res.status(500).json({ error: "Internal error", data: error });
  }
};
