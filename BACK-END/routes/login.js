const express = require("express");

const AuthorModel = require("../models/AuthorModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/login", async (req, res) => {
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

  res.status(200).send({
    stusCode: 200,
    message: "login succesfull!!",
    payload: user,
  });
});

module.exports = router;
