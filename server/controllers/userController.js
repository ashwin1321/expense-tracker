const userModel = require("../models/userModel");

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
      res.status(404).send("User Not Founf");
      return;
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Register
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const user = await userModel.findOne(newUser.email);

    if (user) {
      res.status(404).json({
        success: false,
        msg: "user exixts",
      });
      return;
    }

    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const homeController = (req, res) => {
  res.send("hellop");
};

module.exports = { loginController, registerController, homeController };
