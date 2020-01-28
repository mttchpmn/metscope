"use strict";

const express = require("express");
const User = require("../../database/models").User;
const sessionizeUser = require("../helpers/sessionizeUser");
const parseError = require("../helpers/parseError");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await new User({ firstName, lastName, email, password });
    const sessionUser = sessionizeUser(user);
    await user.save();
    req.session.user = sessionUser;

    return res.status(201).json({ data: { sessionUser } });
  } catch (error) {
    return res.status(400).json({ error: parseError(error) });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const sessionUser = sessionizeUser(user);
      req.session.user = sessionUser;

      return res.status(200).json({ data: { sessionUser } });
    } else {
      throw new Error("Invalid login credentials");
    }
  } catch (error) {
    res.status(401).json({ error: parseError(error) });
  }
});

userRouter.delete("/logout", async ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy();
      res.clearCookie(config.session.name);
      res.send(user);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    res.status(422).json({ error: parseError(error) });
  }
});

userRouter.get("", ({ session: { user } }, res) => {
  res.send({ user });
});

module.exports = userRouter;
