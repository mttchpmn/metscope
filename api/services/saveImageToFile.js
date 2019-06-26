const fs = require("fs");
const axios = require("axios");
const appPath = require("app-root-path");

const winston = require("../config/winston");

module.exports = (name, url, fileName) => {
  winston.info("Saving image to file...");

  fs.access(`${appPath}/images/${name}/`, err => {
    if (err) {
      // If dir doesnt exist
      winston.warn(`${name} directory did not exist.  Creating...`);

      // BUG - If we don't use mkdirSync, it triggers a race condition where writer is trying to open a directory that doesnt exist yet
      fs.mkdirSync(`${appPath}/images/${name}`, err => {
        if (err) winston.error("FOO\n", err);
      });
    }

    // This call creates a race condition as above
    const writer = fs.createWriteStream(
      `${appPath}/images/${name}/${fileName}`
    );

    axios({ method: "get", url: url, responseType: "stream" }).then(
      response => {
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      }
    );
  });
};
