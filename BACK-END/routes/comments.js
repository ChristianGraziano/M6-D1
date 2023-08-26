const express = require("express");

const CommentModel = require("../models/CommentModel");
const AuthorModel = require("../models/AuthorModel");
const PostModel = require("../models/PostModel");

const router = express.Router();

// Chiamata Get per tutti i commenti

router.get("/comments", async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("userName");

    if (!comments || comments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Comments Found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      TotalComments: comments.length,
      message: "Call GET for comments successfully",
      comments,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error in the call GET in Comments",
      error,
    });
  }
});

router.get("/comments/post/:postId", async (req, res) => {
  try {
    const comments = await CommentModel.find({
      postId: req.params.postId,
    }).populate("userName");

    if (!comments || comments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Comments Found for this post",
      });
    }

    res.status(200).send({
      statusCode: 200,
      totalCount: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
});

// Chiamata POST per pubblicare un commento
router.post("/comments/create", async (req, res) => {
  const user = await AuthorModel.findOne({ _id: req.body.userName });
  const postId = await PostModel.findOne({ _id: req.body.postId });
  if (!user || !postId) {
    return res.status(404).send({
      statusCode: 404,
      message: " user or post not found!!",
    });
  }

  const newComment = new CommentModel({
    userName: user._id,
    postId: postId._id,
    content: req.body.content,
    rating: req.body.rating,
  });
  try {
    const comment = await newComment.save();
    await PostModel.updateOne({ $push: { comments: comment } });
    res.status(201).send({
      statusCode: 201,
      message: "New Comment Successfully Created!",
      payload: comment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error in the call POST in comments",
      error,
    });
  }
});

// PATCH per modificare il commento

router.patch("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const commentExist = await CommentModel.findById(commentId);

  if (!commentExist) {
    return res.status(404).send({
      statuscode: 404,
      message: `Comment with id ${commentId} not found!`,
    });
  }

  try {
    const dataUpdate = req.body;
    const options = { new: true };

    const result = await CommentModel.findByIdAndUpdate(
      commentId,
      dataUpdate,
      options
    );

    res.status(200).send({
      statusCode: 200,
      message: "Updated successfully!",
      result,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error in the call PATCH comment ",
      error,
    });
  }
});

// DELETE per eliminare un commento

router.delete("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const commentExist = await CommentModel.findById(commentId);

  if (!commentExist) {
    return res.status(404).send({
      statuscode: 404,
      message: `Comment with id ${commentId} not found!`,
    });
  }

  try {
    const DeleteComment = await CommentModel.findByIdAndDelete(commentId);
    res.status(200).send({
      statusCode: 200,
      message: `Comment with id ${commentId} deleted successfully`,
      DeleteComment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error in the call DELETE comment",
      error,
    });
  }
});

module.exports = router;
