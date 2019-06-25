module.exports = {
  app: {
    port: process.env.port || 3000
  },
  db: {
    user: process.env.user || "metscope",
    host: process.env.host || "localhost",
    database: process.env.db || "metscope",
    password: process.env.pass || "password",
    port: process.env.dbport || 5432
  }
};
