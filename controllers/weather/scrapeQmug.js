const axios = require("axios");
const cheerio = require("cheerio");

const qmug = require("../../config/credentials").qmug;

module.exports = (req, response) => {
  // Response skeleton
  let baseResponse = {
    sigmet: [],
    taf: "",
    aaw: "",
    grafor: [],
    sigwx: []
  };

  // Retrieve the Html page content
  axios({
    url: "http://metra.co.nz/client/qmug",
    method: "get",
    auth: { username: qmug.username, password: qmug.password }
  }).then(res => {
    // Load Html for parsing
    $ = cheerio.load(res.data);

    // Scrape AAW and TAFs
    $("pre").map((i, element) => {
      const content = $(element).text();
      if (content.includes("AVIATION AREA")) baseResponse.aaw = content;
      if (content.includes("TAF")) baseResponse.taf = content;
    });

    // Scrape images
    $("img").map((i, element) => {
      const src = element.attribs.src;

      if (src.includes("nzzc"))
        baseResponse.sigmet.push(
          `http://metra.co.nz/client/qmug/${src.slice(2)}`
        );
      if (src.includes("grafor"))
        baseResponse.grafor.push(
          `http://metra.co.nz/client/qmug/${src.slice(2)}`
        );
      if (src.includes("sigwx"))
        baseResponse.sigwx.push(
          `http://metra.co.nz/client/qmug/${src.slice(2)}`
        );
    });

    // Scrape METARs
    const qnhRegex = new RegExp(/(Q\d{4})+/);
    let metars = $("body")
      .text()
      .split("METAR")
      .filter(item => qnhRegex.test(item));

    // Pop off the last item to trim the extra information, and add it back to array
    let lastMetar = metars.pop().split("NZ Terminal Aerodrome Forecasts")[0];
    metars.push(lastMetar);

    metars = metars.map(item => `METAR ${item.trim()}`);

    baseResponse.metar = metars;

    return response.json({ status: 200, data: baseResponse });
  });
};
