const pool = require("../../../db");
const imageToString = require("../../../services/convertImageToString.js");

module.exports = (req, res) => {
  const imageUrl = `https://www.snowgrass.co.nz/cust/glenorchy_air/images/webcam.jpg`;

  imageToString(imageUrl).then(string => {
    pool.query(
      "INSERT INTO webcams (name, url, string) VALUES ($1, $2, $3)",
      ["glenorchy", imageUrl, string],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(201).send(`Image added with ID: ${results.insertId}`);
      }
    );
  });

  //   return res.json({ status: 200 });
};
