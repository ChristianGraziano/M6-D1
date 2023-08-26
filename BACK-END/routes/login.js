const express = require("express");

const AuthorModel = require("../models/AuthorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = express.Router();

login.post("/login", async (req, res) => {
  const user = await AuthorModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      stusCode: 404,
      message: "User not found!!",
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send({
      stusCode: 400,
      message: "password not valid!!",
    });
  }

  // generatore Token
  const token = jwt.sign(
    {
      name: user.name,
      surname: user.surname,
      email: user.email,
      birthdayDate: user.birthdayDate,
      avatar: user.avatar,
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.header("Authorization", token).status(200).send({
    stusCode: 200,
    message: "login succesfull!!",
    token,
  });
});

module.exports = login;
