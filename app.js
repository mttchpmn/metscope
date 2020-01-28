"use strict";

// External imports
const express = require("express");

const cors = require("cors");
const serveIndex = require("serve-index");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

// Session Setup
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient(process.env.REDIS_URL);

// Internal imports
require("dotenv").config();
const swaggerSpec = require("./api/config/swaggerSpec");
const config = require("./api/config/config");
const winston = require("./api/config/winston");
const withAuth = require("./api/middleware/withAuth");

// Routers and Routes
const authRouter = require("./api/routes/authRouter");
const dataRouter = require("./api/routes/dataRouter");
const utilRouter = require("./api/routes/utilRouter");
const userRouter = require("./api/routes/userRouter");

// Instantiate app
winston.info(`API starting...`);
const app = express();
const port = config.app.port;

// Setup session
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.session.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: true,
      secure: false,
      maxAge: parseInt(config.session.lifetime)
    }
  })
);

// Setup Middlewares
app.use(morgan("combined", { stream: winston.stream }));
app.use(cors()); // This enables CORS for ALL routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configure Routers
app.use("/auth", authRouter);
app.use("/user", userRouter);

// CHANGE COMMENTS TO REENABLE AUTH
// app.use("/data", withAuth, dataRouter);
app.use("/data", dataRouter);

app.use("/util", utilRouter);
app.use(
  "/images",
  express.static("images"),
  serveIndex("images", { icons: true })
);

// Test endpoint
app.get("/", (req, res) => {
  console.log("req.session :", req.session);
  res.status(200).json({ message: `API online at port ${port}` });
});

app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Launch app
app.listen(port, () => winston.info(`API online at port ${port}`));

// Export app for test suite
module.exports = app;
