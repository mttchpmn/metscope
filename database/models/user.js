"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, SALTROUNDS)
      .then(hashedPassword => (user.password = hashedPassword));
  });
  User.validatePassword = function(password, user) {
    return bcrypt.compare(password, user.password).then(valid => [user, valid]);
  };
  return User;
};
