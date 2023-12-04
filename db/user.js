const mongoose = require("mongoose");
require("dotenv").config();
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  age: Number,
  height: Number,
  weight: Number,
  bloodGroup: String,
  temperature: String,
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  bloodSugar: {
    value: Number,
    unit: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
