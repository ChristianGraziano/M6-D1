const express = require("express");

const AuthorModel = require("../models/AuthorModel");
const PostModel = require("../models/PostModel");
const { route, post } = require("./authors");
const {
  postBodyParams,
  validatePostBody,
} = require("../middlewares/postValidation");
const router = express.Router();

//Caricamento immagine con multer locale

const multer = require("multer");
const crypto = require("crypto");

const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploads);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${crypto.randomUUID()}`;
    const fileExt = file.originalname.split(".").pop();
    cb(null, `${file.originalname}-${uniqueSuffix}.${fileExt}`);
  },
});

const uploads = multer({ storage: internalStorage });

router.post(
  "posts/internalUpload",
  uploads.single("cover"),
  async (req, res) => {
    try {
      res.status(200).send({
        img: req.file.path,
        message: " correct upload image!",
      });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "Internal Server Error! in the upload image",
        error,
      });
    }
  }
);

//chiamata get per cercare il titolo dei libri

router.get("/posts/title", async (req, res) => {
  const { postTitle } = req.query;
  try {
    const postByTitle = await PostModel.find({
      title: {
        $regex: ".*" + postTitle + ".*",
        $options: "i",
      },
    });
    if (!postByTitle || postByTitle.length <= 0) {
      res.status(404).send({
        statusCode: 404,
        message: `post with title ${postTitle} not found`,
      });
    }

    res.status(200).send({
      statusCode: 200,
      postByTitle,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error!",
      error,
    });
  }
});

// chiamata get di tutti i post + paginazione
router.get("/posts", async (req, res) => {
  const { page = 1, pageSize = 3 } = req.query;

  try {
    const post = await PostModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .populate("author", "name surname avatar")
      .populate("comments", "content rating userName");

    const totalPost = await PostModel.count();

    res.status(200).send({
      statusCode: 200,
      totalPost: totalPost,
      currentPage: +page,
      pageSize: +pageSize,
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

//chiamata per creare un nuovo post
router.post(
  "/posts/create",

  async (req, res) => {
    const user = await AuthorModel.findOne({ _id: req.body.author });
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: " user not found!!",
      });
    }

    const newPost = new PostModel({
      category: req.body.category,
      title: req.body.title,
      cover: req.body.cover,
      readTime: req.body.readTime,
      author: user._id,
      content: req.body.content,
    });
    try {
      const post = await newPost.save();
      await AuthorModel.updateOne(
        { _id: user._id },
        { $push: { posts: post } }
      );
      res.status(201).send({
        statusCode: 201,
        message: "Post added!",
        payload: post,
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

//chiamata per cancellare un post
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

//chiamata per modificare un post
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
