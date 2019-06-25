// TODO - Move these details to config file and control for DEV / PROD

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "metscope",
  host: "localhost",
  database: "metscope",
  password: "password",
  port: 5432
});

module.exports = pool;
