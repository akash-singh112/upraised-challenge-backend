const Sequelize = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT,
});

async function DBConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to PostgresSQL Database name: ${process.env.DB_NAME}`
    );
  } catch (err) {
    console.log("Unable to connect to the database:", err.message);
  }
}

module.exports = { DBConnection };
