import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { getBlogPost, postBlogPosts, filterPosts } from "../reducers/postSlice";
import { useSession } from "../middlerwares/ProtectedRoutes";
import NewPostModal from "../components/NewPostModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function PostBoard() {
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { postsArray } = useSelector((state) => state.blogPosts);

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value === "") {
      dispatch(getBlogPost());
    }
    setSearchTerm(value);
  };

  const filteredResult = (e) => {
    e.preventDefault();
    dispatch(filterPosts(searchTerm));
  };

  useEffect(() => {
    dispatch(getBlogPost());
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        {session && <NewPostModal />}
      </div>
      <Container className="my-3">
        <Form className="d-flex" onSubmit={filteredResult}>
          <Form.Control
            type="search"
            placeholder="Search in all posts"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button onClick={filteredResult} variant="outline-dark">
            Search
          </Button>
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
