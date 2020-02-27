"use strict";

const Webcam = require("../../../../database/models").Webcam;

module.exports = async oldWebcams => {
  const oldIds = oldWebcams.map(webcam => webcam.id);

  try {
    const dbDeletions = await Webcam.destroy({
      where: {
        id: oldIds
      }
    });

    return dbDeletions;
  } catch (error) {
    throw error;
  }
};
