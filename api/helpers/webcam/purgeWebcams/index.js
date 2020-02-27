"use strict";

const purgeThreshold = require("../../../../config").app.purgeThreshold;
const getOldWebcamsFromDatabase = require("./getOldWebcamsFromDatabase");
const deleteOldWebcamsFromFile = require("./deleteOldWebcamsFromFile");
const deleteOldWebcamsFromDatabase = require("./deleteOldWebcamsFromDatabase");

module.exports = async () => {
  try {
    const oldWebcams = await getOldWebcamsFromDatabase(purgeThreshold);
    const fileDeletions = await deleteOldWebcamsFromFile(oldWebcams);
    const dbDeletions = await deleteOldWebcamsFromDatabase(oldWebcams);

    return { oldWebcams: oldWebcams.length, fileDeletions, dbDeletions };
  } catch (error) {
    throw error;
  }
};
