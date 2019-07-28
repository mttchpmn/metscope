"use strict";

const getPage = require("../../../services/retrieveWebPageContent");

const processWebcamSendResponse = require("../../../services/processWebcam");

module.exports = (name, baseUrl, req, response) => {
  getPage(baseUrl, 10).then(res => {
    let urlRegex = new RegExp(
      /(\/Webcams\/CoronetPeak\/SugarsRun\/\d{12}\.jpg)+/g
    );

    let allImages = res.content.match(urlRegex); // Will get all the image URLs from the day
    console.log("allImages :", allImages);
    const imageUrl = `https://www.coronetpeak.co.nz${allImages.pop()}`;

    processWebcamSendResponse("coronet", imageUrl)
      .then(resObj => res.json(resObj))
      .catch(resObj => res.json({ status: 500, message: "Internal error" }));
  });

  // TODO - Implement the err from the underlying function
  // .catch(err => winston.error("Failed to get webpage for Coronet"));
};
