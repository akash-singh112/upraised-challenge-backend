const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
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
    await sequelize.authenticate();
    console.log(
      `Connected to PostgresSQL Database name: ${process.env.DB_NAME}`
    );
  } catch (err) {
    console.log("Unable to connect to the database:", err.message);
  }
}

module.exports = { DBConnection };
