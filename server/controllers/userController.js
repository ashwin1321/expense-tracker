const userModel = require("../models/userModel");

// Login
const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userModel.findOne({ name, password });

    if (!user) {
      return res.status(404).send("User doesnt't exists");
    }
    else {
      res.status(200).json({
        success: true,
        message: "logged in ",
        user

      });
    }
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
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "user register successfully",
      newUser
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const homeController = (req, res) => {
  res.send("hello");
};

module.exports = { loginController, registerController, homeController };
