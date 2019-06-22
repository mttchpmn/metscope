const cheerio = require("cheerio");

getPage = require("../../services/retrieveWebPageContent");

urlLookup = {
  nz:
    "http://metvuw.com/forecast/forecast.php?type=rain&region=nzsi&noofdays=10",
  nzsi:
    "http://metvuw.com/forecast/forecast.php?type=rain&region=nzsi&noofdays=10",
  nzni:
    "http://metvuw.com/forecast/forecast.php?type=rain&region=nzsi&noofdays=10"
};

module.exports = (req, response) => {
  const url = urlLookup[req.params.area];

  getPage(url).then(res => {
    const $ = cheerio.load(res.content);
    let links = [];

    $("img").each((i, elem) => {
      console.log(elem.attribs.src);
      if (elem.attribs.src.includes("rain"))
        links.push(`http://metvuw.com//forecast${elem.attribs.src.slice(2)}`);
    });

    return response.json({ images: links });
  });
};
