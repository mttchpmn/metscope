const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const bodyParser = require("body-parser");

const winston = require("./config/winston");
const scrapeWebcam = require("./controllers/webcam/scrapeWebcam.js");
const loadWebcam = require("./controllers/webcam/loadWebcam.js");

winston.info(`API starting...`);
const app = express();
const port = 3000;

app.use(morgan("combined", { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ info: `Metscope API online at port ${port}` });
});

app.get("/webcam/scrape/:name", scrapeWebcam);
app.get("/webcam/load/:name", loadWebcam);

app.listen(port);
winston.info(`API online at port ${port}`);
