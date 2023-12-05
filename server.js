const express = require("express");
require("dotenv").config();
const app = express();
const connectDatabase = require("./db/dbConnection");
const User = require("./db/user");
const cors = require("cors");

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;

//registration

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email already registered" });
    }
    console.log(error);
    res.status(500).json({ error: "Registration Failed" });
  }
});

//Login Method
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    res.status(200).json({ message: "Login Succesfull", userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login Failed" });
  }
});

app.post("/updateUserData", async (req, res) => {
  const { userId, ...userData } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "User data updated", userData: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

// Get user data
app.get("/getUserData/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

connectDatabase();
app.listen(port, () => {
  console.log("Server is listening on Port 8000");
});
