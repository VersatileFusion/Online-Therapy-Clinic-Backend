const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");

const sequelize = new Sequelize(
  process.env.DB_NAME || "online_therapy",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = {
  sequelize,
  Sequelize,
};
