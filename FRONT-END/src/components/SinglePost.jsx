import React from "react";
import Card from "react-bootstrap/Card";
import "../style/postStyle.css";
import Col from "react-bootstrap/esm/Col";

function SinglePost({ post }) {
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
      </Card.Body>
      {/* <Card.Footer>
        <Card.Title>
          <img src={author.avatar} />
          {item.author.name} {author.surname}
        </Card.Title>
      </Card.Footer> */}
    </Card>
    // </Col>
  );
}

export default SinglePost;
