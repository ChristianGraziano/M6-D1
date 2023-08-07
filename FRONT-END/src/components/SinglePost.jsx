import React from "react";
import Card from "react-bootstrap/Card";

function SinglePost(item) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.post.cover} />
      <Card.Body>
        <Card.Title>{item.post.title}</Card.Title>
        <Card.Text>{item.post.content}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>
          {" "}
          in: <em>{item.post.category}</em>
        </Card.Text>
        <Card.Text>
          Read Time:{" "}
          <em>
            {item.post.readTime.value} {item.post.readTime.unit}
          </em>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Title>
          <img src={item.author.avatar} />
          {item.author.name} {item.author.surname}
        </Card.Title>
      </Card.Footer>
    </Card>
  );
}

export default SinglePost;
