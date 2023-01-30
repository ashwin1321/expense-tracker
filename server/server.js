const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDb = require("./config/connectDb");
const router = require("./routes/userRoutes");
const app = express();

connectDb();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/users", router);


// listen
app.listen(5000, () => {
  console.log(`Server is running on port 5000`.yellow.bold);
});


//