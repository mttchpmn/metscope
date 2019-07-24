const jwt = require("jsonwebtoken");

const User = require("../../database/models").User;
const winston = require("../config/winston");
const config = require("../config/config");

const withAuth = (req, res, next) => {
  if (!req.header("Authorization")) {
    winston.warn("Auth header missing from login attempt");
    return res
      .status(401)
      .json({ message: "Authorisation header missing from request" });
  }

  const token = req.header("Authorization").replace("Bearer ", "");
  const payload = jwt.verify(token, config.token.secret);
  const { id, email } = payload.user;
  const expired = payload.iat > Date.now();

  if (expired) {
    winston.warn("Auth token expired in login request");
    return res
      .status(401)
      .json({ message: "Token expired. Please log in again" });
  }

  User.findOne({ where: { email } }).then(user => {
    const tokenValid = user.tokens.includes(token);

    if (!tokenValid) {
      winston.warn("Token does not exist on user profile, and is invalid");
      return res
        .status(401)
        .json({ message: "Token invalid. Please log in again" });
    }

    winston.info("Token is current and valid and will log in");
    res.locals.user = { id, email, token };
    return next();
  });
};

module.exports = withAuth;
