const express = require("express");

const AuthorModel = require("../models/AuthorModel");

const router = express.Router();

router.get("/authors", async (req, res) => {
  try {
    const author = await AuthorModel.find();
    res.status(200).send({
      statusCode: 200,
      users: author,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

router.post("/authors", async (req, res) => {
  const newAuthor = new AuthorModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    birthdayDate: req.body.birthdayDate,
    avatar: req.body.avatar,
  });

  try {
    const author = await newAuthor.save();

    res.status(201).send({
      statusCode: 201,
      message: "Autore Aggiunto correttamente!",
      payload: author,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

router.get("/authors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const authorById = await AuthorModel.findById(id);
    res.status(200).send({
      statusCode: 200,
      authorById,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

router.delete("/authors/:id", async (req, res) => {
  const { id } = req.params;
  const authorExsist = await AuthorModel.findById(id);

  if (!authorExsist) {
    return res.status(404).send({
      statusCode: 404,
      message: ` Author with ${id} not found!`,
    });
  }
  try {
    const authorDelete = await AuthorModel.findByIdAndDelete(id);
    res.status(200).send({
      statusCode: 200,
      authorDelete,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore nella chiamata Delete!",
      error,
    });
  }
});

router.patch("/authors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const authorExsist = await AuthorModel.findById(id);

    if (!authorExsist) {
      return res.status(404).send({
        statusCode: 404,
        message: ` Author with ${id} not found!`,
      });
    }
    const dataToUpdate = req.body;
    const options = { new: true };

    const result = await AuthorModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      options
    );

    res.status(200).send({
      statusCode: 200,
      result,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore nella chiamata patch degli Autori!",
      error,
    });
  }
});

module.exports = router;
