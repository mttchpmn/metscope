// TODO - Move DB save to separate function and check if image is new before saving

const pool = require("../../../config/db");
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
        res.status(201).send(`Webcam image saved to DB successfully`);
      }
    );
  });
  //   return res.json({ status: 200 });
};
