require("dotenv").config();
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://snahashiskanrar:ZBDD1snEfRfXY0ix@cluster0.4d2blsy.mongodb.net/?retryWrites=true&w=majority";
const connectDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
