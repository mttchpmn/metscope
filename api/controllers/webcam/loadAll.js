"use strict";

const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const winston = require("../../config/winston");
const webcamList = require("../../config/webcamList");
const Webcam = require("../../../database/models").Webcam;

const loadWebcam = (req, response) => {
  winston.info(`Loading all webcams`);

  const names = Object.keys(webcamList);
  let twentyFourHoursAgo = moment
    .utc()
    .subtract(24, "hours")
    .format();

  Webcam.findAll({ where: { date: { [Op.gt]: twentyFourHoursAgo } } })
    .then(webcams => {
      let resultArray = names.map(name => {
        let nameObj = {};
        if (webcamList[name]) {
          nameObj.name = name;
          nameObj.title = webcamList[name].title;
          nameObj.desc = webcamList[name].desc;
          nameObj.images = webcams.filter(i => i.name === name); // TODO - Refactor to be more efficient
        }
        return nameObj;
      });
      return response.json(resultArray);
    })
    .catch(err => winston.error(err));
};

module.exports = loadWebcam;
