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

      console.log("TOKEN ISSUED");
      console.log(token, "\n\n");

      console.log("user.tokens.length :", user.tokens.length);
      console.log("newTokenList.length :", newTokenList.length);
      let check = newTokenList.includes(token);
      console.log("check :", check);

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

router.post("/logout", (req, res, next) => {});

module.exports = router;
