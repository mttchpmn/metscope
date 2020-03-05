module.exports = {
  development: {
    username: "metscope",
    password: "password",
    database: "metscope",
    dialect: "postgres",
    host: "db", // 'db' refers to the database host on the Docker Containers internal network
    port: 5432,
    logging: false
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "metscope",
    dialect: "postgres",
    host: "db", // 'db' refers to the database host on the Docker Containers internal network
    port: 5432,
    logging: false
  },
  production: {
    user: process.env.DB_USER || "metscope",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "metscope",
    dialect: "postgres",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    maxConnections: 5,
    logging: false
  }
};
