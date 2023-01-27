const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// listen
app.listen(5000, () => {
  console.log(`Server is running on port 5000`.yellow.bold);
});
