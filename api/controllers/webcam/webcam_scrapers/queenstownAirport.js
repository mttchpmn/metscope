const cheerio = require("cheerio");

const winston = require("../../../config/winston");
const getPage = require("../../../services/retrieveWebPageContent");
const saveWebcam = require("../../../services/processWebcamSendResponse");

module.exports = (webcamName, baseUrl, req, response) => {
  let imageUrl;
  const nameLookup = {
    qnAirportNW: "tower",
    qnAirportN: "coronet",
    qnAirportNE: "stands",
    qnAirportW: "lake",
    qnAirportE: "remarks"
  };
  getPage(baseUrl)
    .then(res => cheerio.load(res.content))
    .then($ => {
      $("img").map((i, elem) => {
        if (elem.attribs.src.includes(`/Webcams/${nameLookup[webcamName]}`))
          imageUrl = `https://queenstownairport.co.nz${elem.attribs.src}`;
      });
      return imageUrl;
    })
    .then(imageUrl => saveWebcam(webcamName, imageUrl))
    .then(resObj => response.json(resObj))
    .catch(err => {
      winston.error(err);
      response.status(500).json({ message: `Internal error: \n${err}` });
    });
};
