const moment = require("moment");

const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");
const Webcam = require("../../../database/models").Webcam;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const loadWebcam = (req, res) => {
  const webcamName = req.params.name;
  winston.info(`Loading webcams for ${webcamName}`);

  if (!webcamList[webcamName]) {
    return res.status(404).json({ message: `Webcam: ${webcamName} not found` });
  }

  let responseObj = {
    name: webcamName,
    title: webcamList[webcamName].title,
    desc: webcamList[webcamName].desc
  };

  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  Webcam.findAll({
    where: { name: webcamName, date: { [Op.gt]: twentyFourHoursAgo } }
  })
    .then(webcams => {
      winston.info(`Found ${webcams.length} rows`);
      responseObj.images = webcams;
      res.status(200).json(responseObj);
    })
    .catch(err => {
      winston.error(err);
      res.status(500).json({ message: "Internal error" });
    });
};

module.exports = loadWebcam;
