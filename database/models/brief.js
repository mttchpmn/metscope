"use strict";

module.exports = (sequelize, DataTypes) => {
  const Brief = sequelize.define(
    "Brief",
    {
      id: DataTypes.STRING,
      date: DataTypes.DATE,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      info: DataTypes.JSON,
      aerodromes: DataTypes.JSON,
      aaw: DataTypes.JSON,
      sigmet: DataTypes.JSON,
      charts: DataTypes.JSON
    },
    {}
  );
  Brief.associate = function(models) {
    // associations can be defined here
  };
  return Brief;
};
