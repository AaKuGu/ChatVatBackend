const mongoose = require("mongoose");

module.exports.dbConnection = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL);
    // console.log("mongodb connection established");
  } catch (error) {
    // console.log(`error in dbConnection in dbConnection folder in server`);
  }
};
