module.exports = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    username: "metscope",
    password: "password",
    database: "metscope",
    dialect: "postgres",
    host: "db", // 'db' refers to the database host on the Docker Containers internal network
    port: 5432
  },
  domain: {
    baseUrl: `localhost:${process.env.PORT || 3000}`
  }
};
