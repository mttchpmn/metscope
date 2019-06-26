const scrapeWebcam = require("../controllers/webcam/scrapeWebcam.js");
const loadWebcam = require("../controllers/webcam/loadWebcam.js");
const loadAllWebcams = require("../controllers/webcam/loadAllWebcams");
const loadLatestWebcam = require("../controllers/webcam/loadLatestWebcam.js");

const scrapeMetvuw = require("../controllers/weather/scrapeMetvuw");
const scrapeQmug = require("../controllers/weather/scrapeQmug");

module.exports = app => {
  app.get("/", (req, res) => {
    res.json({ info: `Metscope API online at port ${port}` });
  });

  app.get("/webcam/scrape/:name", scrapeWebcam);
  // app.get("/webcam/scrape/all", scrapeWebcam);  // TODO

  app.get("/webcam/load/all", loadAllWebcams);
  app.get("/webcam/load/:name", loadWebcam);
  app.get("/webcam/latest/:name", loadLatestWebcam);

  app.get("/weather/scrape/metvuw/:area", scrapeMetvuw);
  app.get("/weather/scrape/qmug/", scrapeQmug);
  //   app.get("/weather/scrape/metflight/", scrapeMetflight);  // TODO
};
