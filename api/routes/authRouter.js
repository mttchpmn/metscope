const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const winston = require("../config/winston");
const User = require("../../database/models").User;

router.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      message: `Missing parameters. 'firstName', 'lastName', 'email', and 'password' must all be provided.`
    });
  }

  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName, email, password }
  })
    .then(([user, userCreated]) => {
      if (userCreated) {
        return res.status(201).json({ user, message: "New user created" });
      }
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

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
      return User.validatePassword(password, user);
    })
    .then(([user, valid]) => {
      if (!valid) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const payload = { id: user.id, email: user.email };
      const token = jwt.sign({ user: payload }, config.token.secret, {
        expiresIn: config.token.expiry
      });
      return res.status(200).json({ token, message: "Logged in successfully" });
    })
    .catch(error => {
      winston.error(error.message);
      return res.status(500).json({ error, message: "Internal error" });
    });
});

router.post("/logout", (req, res, next) => {});

module.exports = router;
