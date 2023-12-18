const mongoose = require("mongoose");
require("dotenv").config();

const getDbConnection = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getDbConnection,
};
