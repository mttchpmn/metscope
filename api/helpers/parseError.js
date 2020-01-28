"use strict";

module.exports = err => JSON.stringify(err, Object.getOwnPropertyNames(err));
