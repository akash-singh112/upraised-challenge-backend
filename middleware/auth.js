const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

async function RegisterFunction(req, res) {
  try {
    const { username, password } = req.body;

    // Ensure both fields are provided
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password.",
      });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken." });
    }
    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error while creating user", error });
  }
}

async function LoginFunction(req, res) {
  try {
    const { username, password } = req.body;

    // Ensure both fields are provided
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password.",
      });
    }

    const user1 = await User.findOne({ where: { username } });
    if (!user1) {
      return res.status(404).json({
        success: false,
        message: "User does not exist. Please register.",
      });
    }

    const isValid = await User.comparePassword(password, user1.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const jwtToken = jwt.sign(
      { id: user1.id, username: user1.username },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Login successful", jwtToken });
  } catch (error) {
    console.log("Error: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error logging in", error });
  }
}

module.exports = { RegisterFunction, LoginFunction };
