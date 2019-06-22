const Pool = require("pg").Pool;
const pool = new Pool({
  user: "metscope",
  host: "localhost",
  database: "metscope",
  password: "password",
  port: 5432
});

module.exports = pool;
