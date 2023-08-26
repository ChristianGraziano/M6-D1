import React from "react";
import Card from "react-bootstrap/Card";
import "../style/postStyle.css";
import Col from "react-bootstrap/esm/Col";
import { FaTrashAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteBlogPost, getBlogPost } from "../reducers/postSlice";
import { Link } from "react-router-dom";
import { useSession } from "../middlerwares/ProtectedRoutes";
import jwtDecode from "jwt-decode";

function SinglePost({ post }) {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("userLoggedIn"));
  const tokenDecoded = jwtDecode(token);

  console.log(tokenDecoded.id);

  const handleDelete = () => {
    dispatch(deleteBlogPost(post._id)).then(() => dispatch(getBlogPost()));
  };

  const session = useSession();
  console.log(session);

  return (
    // <Col lg={3} md={4} sm={12} xs={12}>
    <Card className="postCard-style shadow">
      <Card.Img className="img-post" variant="top" src={post.cover} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text className="content-post-style">{post.content}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>
          in: <em>{post.category}</em>
        </Card.Text>

        {post.author._id === tokenDecoded.id && (
          <div className="d-flex justify-content-end ">
            <Button className="button-trash" onClick={handleDelete}>
              <FaTrashAlt />
            </Button>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <Link to={`/postDetails/${post._id}`}>
            <Button className="button-link-details" size="sm">
              Read All...
            </Button>
          </Link>
        </div>
      </Card.Body>

      <Card.Footer>
        <Card.Title>
          <img className="img-author-post me-2" src={post.author.avatar} />
          <span className="fs-6">
            {post.author.name} {post.author.surname}
          </span>
        </Card.Title>
      </Card.Footer>
    </Card>
    // </Col>
  );
}

export default SinglePost;
