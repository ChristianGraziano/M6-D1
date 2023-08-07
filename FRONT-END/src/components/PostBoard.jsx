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

function PostBoard() {
  const session = useSession();

  const dispatch = useDispatch();
  const postsArray = useSelector((state) => state.blogPost);
  console.log(postsArray);
  useEffect(() => {
    dispatch(getBlogPost());
  }, []);

  return (
    <>
      {session && <NewPostModal />}
      <Container>
        <Row>
          <Col>
            {postsArray &&
              postsArray.map((post) => {
                return <SinglePost key={nanoid()} post={post} />;
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostBoard;
