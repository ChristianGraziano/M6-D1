import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { blogPostById } from "../reducers/postSlice";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import { nanoid } from "@reduxjs/toolkit";
import SpinnerLoading from "../components/SpinnerLoading";
import "../style/postDetailsStyle.css";
import NavigationBar from "./NavigationBar";
import { fetchCommentsByPost, createComment } from "../reducers/commentSlice";
import { useRef } from "react";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    dispatch(blogPostById(id));
    dispatch(fetchCommentsByPost(id));
  }, [dispatch, id]);

  const singlePost = useSelector(
    (state) => state.blogPosts.singlePost.blogPostsById
  );

  const comments = useSelector((state) => state.comments.commentsArrayByPost);
  console.log(singlePost);
  console.log(comments);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createComment({ content: commentContent, rating: rating, postId: id })
    );
    setCommentContent("");
    setRating(1);
  };

  return (
    <>
      <NavigationBar />
      {singlePost ? (
        <Container>
          <div className="my-5 pt-5">
            <h4 className="text-center mb-2 fs-3">{singlePost.title}</h4>
            <img
              className=" img-post-details shadow mb-2 mx-auto w-100"
              src={singlePost.cover}
              alt="img"
            />
            <div>
              <em>
                Di: {singlePost.author.name} {singlePost.author.surname}
              </em>
              {/* <em>
              Read Time: {singlePost.readTime.value} {singlePost.readTime.unit}
            </em> */}
            </div>
            <div>
              <span className="fw-bold">Descrizione: {singlePost.content}</span>
            </div>
          </div>
          <section>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fs-4">Add a comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </div>
            </Form>

            <ListGroup className="mt-4 post-comments">
              {comments &&
                comments.map((comment) => (
                  <ListGroup.Item key={nanoid()}>
                    Author: {comment.userName.name}
                    <hr className="border-white" />
                    {comment.content}
                    <hr />
                    Rating: {comment.rating}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </section>
        </Container>
      ) : (
        <div className="d-flex justify-content-center align-items-center div-100vh">
          <SpinnerLoading />;
        </div>
      )}
    </>
  );
};

export default PostDetails;
