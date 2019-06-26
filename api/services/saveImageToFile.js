const fs = require("fs");
const util = require("util");
const axios = require("axios");
const appPath = require("app-root-path");

const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

const winston = require("../config/winston");

const saveFile = (name, url, fileName) => {
  const writer = fs.createWriteStream(`${appPath}/images/${name}/${fileName}`);

  axios({ method: "get", url: url, responseType: "stream" }).then(response => {
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  });
};

module.exports = (name, url, fileName) => {
  winston.info("Saving image to file...");

  access(`${appPath}/images/${name}/`)
    .then(() => {
      saveFile(name, url, fileName);
    })
    .catch(err => {
      winston.warn(`${name} directory did not exist.  Creating...`);

      mkdir(`${appPath}/images/${name}`)
        .then(() => saveFile(name, url, fileName))
        .catch(err => winston.error(`ERROR: ${err}`));
    });
};
