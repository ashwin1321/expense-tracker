const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected...${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log(`Error: ${error}`.bgRed);
  }
};

module.exports = connectDb;
