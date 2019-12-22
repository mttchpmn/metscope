"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Briefs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      from: {
        type: Sequelize.DATE,
        allowNull: false
      },
      to: {
        type: Sequelize.DATE,
        allowNull: false
      },
      info: {
        type: Sequelize.JSON,
        allowNull: false
      },
      aerodromes: {
        type: Sequelize.JSON,
        allowNull: false
      },
      aaw: {
        type: Sequelize.JSON,
        allowNull: false
      },
      sigmet: {
        type: Sequelize.JSON,
        allowNull: false
      },
      charts: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Briefs");
  }
};
