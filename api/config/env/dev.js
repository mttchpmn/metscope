module.exports = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    user: "metscope",
    // 'db' refers to the database host on the Docker Containers internal network
    host: "db",
    database: "metscope",
    password: "password",
    port: 5432
  },
  domain: {
    baseUrl: `localhost:${process.env.PORT || 3000}`
  }
};
