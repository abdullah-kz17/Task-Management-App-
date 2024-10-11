const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// Register User Controller
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please input all fields" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreate = await User.create({ username, email, password });
    return res.status(201).json({
      message: "User registered successfully",
      user: userCreate,
      token: userCreate.generateToken(),
      id: userCreate._id,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error creating user", error });
  }
};

// Login User Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please input all fields" });
    }

    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await userExists.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login Successful",
      token: userExists.generateToken(),
      id: userExists._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error Logging user", error });
  }
};

// get current user data

const getCurrentUser = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user data", error });
  }
};

module.exports = { Register, Login, getCurrentUser };
