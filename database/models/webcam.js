'use strict';
module.exports = (sequelize, DataTypes) => {
  const Webcam = sequelize.define('Webcam', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    url: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Webcam.associate = function(models) {
    // associations can be defined here
  };
  return Webcam;
};