import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { getBlogPost, postBlogPosts } from "../reducers/postSlice";
import { useSession } from "../middlerwares/ProtectedRoutes";
import NewPostModal from "../components/NewPostModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function PostBoard() {
  const session = useSession();

  const dispatch = useDispatch();
  const { postsArray } = useSelector((state) => state.blogPosts);

  useEffect(() => {
    dispatch(getBlogPost());
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        {session && <NewPostModal />}
      </div>
      <Container className="my-3">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-dark">Search</Button>
        </Form>
      </Container>
      <Container className="my-5">
        <Row className="d-flex">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {postsArray &&
              postsArray.map((post) => {
                return <SinglePost key={nanoid()} post={post} />;
              })}
          </div>
        </Row>
      </Container>
    </>
  );
}

export default PostBoard;
