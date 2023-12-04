require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const connectDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
