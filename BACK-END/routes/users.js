const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const user = express.Router();

user.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({
      statusCode: 200,
      users: users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

user.post("/users", async (req, res) => {
  const newUser = new UserModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    birthdayDate: req.body.birthdayDate,
    avatar: req.body.avatar,
  });

  try {
    const user = await newUser.save();

    res.status(201).send({
      statusCode: 201,
      message: "User Aggiunto correttamente!",
      payload: user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

module.exports = user;
