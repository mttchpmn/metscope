const scrapeWebcam = require("./controllers/webcam/scrapeWebcam.js");
const loadWebcam = require("./controllers/webcam/loadWebcam.js");

module.exports = app => {
  app.get("/", (req, res) => {
    res.json({ info: `Metscope API online at port ${port}` });
  });

  app.get("/webcam/scrape/:name", scrapeWebcam);
  app.get("/webcam/load/:name", loadWebcam);
};
