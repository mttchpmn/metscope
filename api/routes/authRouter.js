"use strict";

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const winston = require("../config/winston");
const User = require("../../database/models").User;
const withAuth = require("../middleware/withAuth");

/**
 * @swagger
 *
 * /auth/signup:
 *  post:
 *    description: Sign up to API
 *    tags:
 *      - authentication
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: firstName
 *        description: First name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastName
 *        description: Last Name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: Email address
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Signup successful
 *      500:
 *        description: Internal Error
 */
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

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    description: Login to API
 *    tags:
 *      - authentication
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: email
 *        description: Email address used for signup
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password used for signup
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Login successful
 *      500:
 *        description: Internal Error
 */
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

/**
 * @swagger
 *
 * /auth/logout:
 *  post:
 *    description: Logout of API and delete token from profile
 *    tags:
 *      - authentication
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: X-Authorization
 *        description: JWT bearer token
 *        in: header
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Logout successful
 *      500:
 *        description: Internal Error
 */
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
