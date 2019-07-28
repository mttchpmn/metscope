const clyde = require("./clyde");
const fiords = require("./fiords");
const alps = require("./alps");

module.exports = {
  clyde,
  fiords,
  alps,
  all: clyde.concat(fiords).concat(alps)
};
