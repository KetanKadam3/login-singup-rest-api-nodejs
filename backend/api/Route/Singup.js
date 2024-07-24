const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Modules/User"); // Adjust the path as needed
const emailValidator = require('deep-email-validator');
const disposableEmailDomains = require('disposable-email-domains');


// Function to validate email
async function isEmailValid(email) {
  return emailValidator.validate(email);
}

router.post("/", async (req, res) => {
  console.log(req.body); // Log the request body for debugging

  const { userName, email, password } = req.body;

  
  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  if (!userName) {
    return res.status(400).json({
      error: "Username is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }
// Validate the email
const { valid, reason, validators } = await isEmailValid(email);
if (!valid) {
  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason,
  });
}


const emailDomain = email.split('@')[1];

if (disposableEmailDomains.includes(emailDomain)) {
  return res.status(400).send({
    message: "Please provide a valid email address.",
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
