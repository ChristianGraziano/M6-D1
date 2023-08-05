const express = require("express");

const CommentModel = require("../models/CommentModel");
const AuthorModel = require("../models/AuthorModel");
const PostModel = require("../models/PostModel");
const bcrypt = require("bcrypt");
const AvatarImg = require("../middlewares/UploadCloudinary");

const router = express.Router();

// chiamata GET per avere tutti gli autori

router.get("/authors", async (req, res) => {
  try {
    const author = await AuthorModel.find().populate("posts");

    const totalAuthor = await AuthorModel.count();

    res.status(200).send({
      statusCode: 200,
      message: " call GET authors successful",
      totalAuthor: totalAuthor,
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

//Post per creare nuovo autore
router.post(
  "/register/authors",
  AvatarImg.single("avatar"),
  async (req, res) => {
    const salt = await bcrypt.genSalt(10); // per scegliere complessità algoritmo di protezione password.

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newAuthor = new AuthorModel({
      name: req.body.name,
      surname: req.body.surname,
      password: hashedPassword,
      email: req.body.email,
      birthdayDate: req.body.birthdayDate,
      avatar: req.file.path,
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
  }
);

//Ricerca autori per ID

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

// chiamata per cercare dei post in base all'autore

router.get("/authors/:id/posts", async (req, res) => {
  const { id } = req.params;
  const findAuthor = await AuthorModel.findById(id);
  console.log(findAuthor.name);

  const findPost = await PostModel.find({
    "author.name": findAuthor.name,
  });
  console.log(findAuthor.name);

  try {
    res.status(200).send({
      statusCode: 200,
      message: `post corrispondente all' ${id} trovato!`,
      findPost,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore nella ricerca!",
      error,
    });
  }
});

module.exports = router;
