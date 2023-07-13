const express = require("express");

const PostModel = require("../models/PostModel");
const { route, post } = require("./authors");

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).send({
      statusCode: 200,
      post: post,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

router.post("/posts", async (req, res) => {
  const newPost = new PostModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    readTime: req.body.readTime,
    author: req.body.author,
    content: req.body.content,
  });
  try {
    const post = newPost.save();
    res.status(201).send({
      statusCode: 201,
      message: "Post Aggiunto correttamente!",
      payload: post,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const postExsist = await PostModel.findById(id);

  if (!postExsist) {
    return res.status(404).send({
      statusCode: 404,
      message: ` Post with ${id} not found!`,
    });
  }
  try {
    const postDelete = await PostModel.findByIdAndDelete(id);
    res.status(200).send({
      statusCode: 200,
      message: "Post eliminato correttamente",
      postDelete,
    });
  } catch {
    res.status(500).send({
      statusCode: 500,
      message: "Errore nella chiamata Delete!",
    });
  }
});

router.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postExsist = await PostModel.findById(id);

    if (!postExsist) {
      return res.status(404).send({
        statusCode: 404,
        message: ` Author with ${id} not found!`,
      });
    }

    const dataToUpdate = req.body;
    const options = { new: true };

    const result = await PostModel.findByIdAndUpdate(id, dataToUpdate, options);

    res.status(200).send({
      statusCode: 200,
      message: "Post Modificato Correttamente!",
      result,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore nella chiamata patch dei Post!",
      error,
    });
  }
});

module.exports = router;
