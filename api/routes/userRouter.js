"use strict";

const express = require("express");
const User = require("../../database/models").User;
const sessionizeUser = require("../helpers/sessionizeUser");
const parseError = require("../helpers/parseError");
const config = require("../config/config");

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await new User({ firstName, lastName, email, password });
    const sessionUser = sessionizeUser(user);
    await user.save();
    req.session.user = sessionUser;

    res.send(sessionUser);

    // return res.status(200).json({ data: { user } });
  } catch (error) {
    console.log("ERRORRRRRR");
    return res.status(400).json({ error: parseError(error) });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && User.validatePassword(password, user)) {
      const sessionUser = sessionizeUser(user);

      req.session.user = sessionUser;
      console.log("req.session :", req.session);
      res.send(sessionUser);
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
      session.destroy(err => {
        if (err) throw err;

        res.clearCookie(config.session.name);
        res.send(user);
      });
    } else {
      throw new Error("SOmething went wrong");
    }
  } catch (error) {
    res.status(422).json({ error: parseError(error) });
  }
});

userRouter.get("", ({ session: { user } }, res) => {
  res.send({ user });
});

module.exports = userRouter;
