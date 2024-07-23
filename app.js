const express = require("express");
var cors = require("cors");
const signup = require("./api/Route/Singup");
const login = require("./api/Route/Login");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://newNoOne:5IsnhDTNjNXj9R7P@cluster0.hatglqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected with database", connected);
});

app.use(express.json());

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // or app.use(express.json());
app.use("/singup", signup);
app.use("/login", login);

module.exports = app;
