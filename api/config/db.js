const env = process.env.NODE_ENV || "development";
const config = require("../../database/config")[env];

const Pool = require("pg").Pool;
const pool = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port || 5432,
  max: config.maxConnections || 10
});

module.exports = pool;
