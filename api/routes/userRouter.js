"use strict";

const express = require("express");
const User = require("../../database/models").User;

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await new User({ firstName, lastName, email, password });
    await user.save();
    return res.status(200).json({ data: { user } });
  } catch (error) {
    console.log("ERRORRRRRR");
    return res.status(400).json({ error });
  }
});

module.exports = userRouter;
