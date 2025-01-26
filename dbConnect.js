const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_INTERNAL_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function DBConnection() {
  try {
    console.log(
      process.env.DB_INTERNAL_URL
        ? "DB_INTERNAL_URL is set"
        : "DB_INTERNAL_URL is not set"
    );
    console.log(
      process.env.DB_EXTERNAL_URL
        ? "DB_EXTERNAL_URL is set"
        : "DB_EXTERNAL_URL is not set"
    );
    await sequelize.authenticate();
    console.log(
      `Connected to PostgresSQL Database name: ${process.env.DB_NAME}`
    );
  } catch (err) {
    console.log("Unable to connect to the database:", err.message);
  }
}

module.exports = { DBConnection };
