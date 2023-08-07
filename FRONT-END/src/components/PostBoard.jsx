import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { postBlogPosts, getBlogPost } from "../reducers/postSlice";
import { useSession } from "../middlerwares/ProtectedRoutes";
import NewPostModal from "../components/NewPostModal";

function PostBoard() {
  const session = useSession();

  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.blogPost);

  useEffect(() => {
    dispatch(getBlogPost());
  }, []);

  return (
    <>
      {session && <NewPostModal />}

      {allPost.postsArray && (
        <Container fluid>
          <Row className="g-4 mx-auto" key={nanoid()}>
            {allPost.postArray &&
              allPost.postArray.map((post) => {
                return (
                  <Col className="d-flex justify-content-center" key={nanoid()}>
                    <SinglePost item={post} />
                  </Col>
                );
              })}
          </Row>
        </Container>
      )}
    </>
  );
}

export default PostBoard;
