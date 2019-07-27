"use strict";

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const winston = require("../config/winston");
const User = require("../../database/models").User;
const withAuth = require("../middleware/withAuth");

router.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  if (!firstName || !lastName || !email || !password) {
    winston.warn(`Missing parameters for user signup`);
    return res.status(422).json({
      message: `Missing parameters. 'firstName', 'lastName', 'email', and 'password' must all be provided.`
    });
  }

  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName, email, password, tokens: [] }
  })
    .then(([user, userCreated]) => {
      if (userCreated) {
        winston.info(`New user created for ${user.email}`);
        return res.status(201).json({ user, message: "New user created" });
      }
      winston.warn(`Email already already in use: ${user.email}`);
      return res.status(400).json({ message: "Email already in use" });
    })
    .catch(error => {
      winston.error(error.message);
      res.status(500).json({ error, message: "Internal error" });
    });
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let token;

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        winston.warn(`Email: ${email} not found for user login`);
        return res.status(404).json({ message: "Email not found" });
      }
      return User.validatePassword(password, user);
    })
    .then(([user, valid]) => {
      if (!valid) {
        winston.warn(`Incorrect password for ${user.email}`);
        return res.status(401).json({ message: "Incorrect password" });
      }
      const payload = { id: user.id, email: user.email };
      token = jwt.sign({ user: payload }, config.token.secret, {
        expiresIn: config.token.expiry
      });
      let newTokenList = [...user.tokens, token];

      let check = newTokenList.includes(token);

      return User.update(
        { tokens: newTokenList },
        { where: { email: user.email } }
      );
    })
    .then(rowsUpdated => {
      winston.info(`Log in successful`);
      return res.status(200).json({
        token: token,
        message: "Logged in successfully"
      });
    })
    .catch(error => {
      winston.error(error.message);
      return res.status(500).json({ error, message: "Internal error" });
    });
});

router.post("/logout", withAuth, (req, res, next) => {
  // Should we delete all tokens? or Nah?
  const { id, email, token } = res.locals.user;

  winston.info(`Logging out user: ${email}`);
  User.findOne({ where: { email } })
    .then(user => {
      newTokenList = user.tokens.filter(i => i !== token);
      return User.update({ tokens: newTokenList }, { where: { email } });
    })
    .then(rowsUpdated => {
      winston.info(`Token deleted from profile for email: ${email}`);
      return res.status(200).json({ message: "Logged out successfully" });
    })
    .catch(err => {
      winston.error(err.message);
      return res.status(500).json({ message: "Internal error" });
    });
});

module.exports = router;
