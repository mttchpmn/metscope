"use strict";

module.exports = (sequelize, DataTypes) => {
  const Webcam = sequelize.define(
    "Webcam",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Webcam.associate = function(models) {
    // associations can be defined here
  };
  return Webcam;
};
