"use strict";

const winston = require("../../services/winston");
const loadWebcams = require("../../helpers/webcam/loadWebcams");

const loadWebcam = async (req, res) => {
  const area = req.params.area;
  winston.info(`Loading webcams for ${area}...`);

  try {
    const data = await loadWebcams(area);

    return res.status(200).json({ data });
  } catch (error) {
    winston.error(`Error: ${error}`);
    return res.status(500).json({ error: "Internal error", data: error });
  }
};

module.exports = loadWebcam;

//   const allNames = webcams.map(cam => cam.code);
//   const requestedCam = webcams.filter(cam => cam.code === webcamName)[0];

//   if (!allNames.includes(webcamName)) {
//     return res.status(404).json({ message: `Webcam: ${webcamName} not found` });
//   }

//   // Response skeleton
//   let data = {
//     webcam: requestedCam
//   };

//   // Helper function for time comparison
//   const hoursAgo = num =>
//     moment
//       .utc()
//       .subtract(num, "hours")
//       .format();

//   Webcam.findAll({
//     where: { name: webcamName, date: { [Op.gt]: hoursAgo(12) } }
//   })
//     .then(images => {
//       winston.info(`Found ${images.length} rows`);
//       images.sort((a, b) => (a.id > b.id ? 1 : -1));

//       const latestImage = images[images.length - 1];
//       if (latestImage && moment(latestImage.date).isBefore(hoursAgo(2))) {
//         webcam.stale = true;
//       }

//       data.webcam.images = images;

//       res.status(200).json({ data });
//     })
//     .catch(err => {
//       winston.error(err.message);
//       res.status(500).json({ error: "Internal error" });
//     });
// };
