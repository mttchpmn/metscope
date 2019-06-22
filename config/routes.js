const scrapeWebcam = require("../controllers/webcam/scrapeWebcam.js");
const loadWebcam = require("../controllers/webcam/loadWebcam.js");

const scrapeMetvuw = require("../controllers/weather/scrapeMetvuw");

module.exports = app => {
  app.get("/", (req, res) => {
    res.json({ info: `Metscope API online at port ${port}` });
  });

  app.get("/webcam/scrape/:name", scrapeWebcam);
  app.get("/webcam/load/:name", loadWebcam);

  app.get("/weather/scrape/metvuw/:area", scrapeMetvuw);
  //   app.get("/weather/scrape/metflight/", scrapeMetflight);
};
