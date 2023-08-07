import React from "react";
import Card from "react-bootstrap/Card";

function SinglePost({ post }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={post.cover} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>
          <em>{post.category}</em>
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <Card.Title>
          <img src={author.avatar} />
          {item.author.name} {author.surname}
        </Card.Title>
      </Card.Footer> */}
    </Card>
  );
}

export default SinglePost;
