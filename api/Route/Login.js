const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../Modules/User"); // Adjust the path as needed

router.post("/", async (req, res) => {
  console.log(req.body, "jj"); // Log the request body for debugging)
  console.log(User);
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  if (existingUser.password !== password) {
    return res.status(400).json({
      error: "Incorrect password",
    });
  }
  res.status(200).json({
    message: `${existingUser.userName} Logged successful`,
    data: existingUser,
  });
});

module.exports = router;
