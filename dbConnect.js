require("dotenv").config();

const { sequelize } = require("./sequelize/models");

async function DBConnection() {
  try {
    await sequelize.authenticate();
    console.log(`Connected to database!`);
  } catch (err) {
    console.log("Unable to connect to the database:", err.message);
  }
}

module.exports = { DBConnection };
