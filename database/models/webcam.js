"use strict";

// Add area, areaCode, region, zone

module.exports = (sequelize, DataTypes) => {
  const Webcam = sequelize.define(
    "Webcam",
    {
      code: { type: DataTypes.STRING, allowNull: false },
      area: { type: DataTypes.STRING, allowNull: false },
      areaCode: { type: DataTypes.STRING, allowNull: false },
      region: { type: DataTypes.STRING, allowNull: false },
      zone: { type: DataTypes.STRING, allowNull: false },
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
