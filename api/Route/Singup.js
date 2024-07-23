const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Modules/User"); // Adjust the path as needed

router.post("/", async (req, res) => {
  console.log(req.body); // Log the request body for debugging

  const { userName, email, password } = req.body;

  console.log(User);

  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  // Create a new user
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    userName,
    email,
    password,
  });

  // Save the user to the database
  try {
    const result = await user.save();
    res.status(201).json({
      message: "User created",
      user: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
