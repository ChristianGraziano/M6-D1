import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import { getBlogPost, postBlogPosts } from "../reducers/postSlice";
import Form from "react-bootstrap/Form";
import jwtDecode from "jwt-decode";

function NewPostModal() {
  const dispatch = useDispatch();

  const category = useRef(null);
  const title = useRef(null);
  // const author = useRef(null);
  const content = useRef(null);
  const readTimeValue = useRef(null);
  const readTimeUnit = useRef(null);
  const cover = useRef(null);

  const submitForm = async () => {
    const token = localStorage.getItem("userLoggedIn");
    if (token) {
      const decodedToken = jwtDecode(token);
      const authorId = decodedToken.id;

      const postPayload = {
        category: category.current.value,
        title: title.current.value,
        author: authorId,
        content: content.current.value,
        readTime: {
          value: readTimeValue.current.value,
          unit: readTimeUnit.current.value,
        },
        cover: cover.current.files[0],
      };

      dispatch(postBlogPosts(postPayload)).then(() => {
        dispatch(getBlogPost());
        handleClose();
      });
    }
  };

  //funzione della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Add New Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="input"
              className="my-1"
              ref={category}
              placeholder="Category"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={title}
              placeholder="Title"
            />
            {/* <Form.Control
              type="input"
              className="my-1"
              ref={author}
              placeholder="Author ID"
            /> */}
            <Form.Control
              type="input"
              className="my-1"
              ref={content}
              placeholder="Content"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={readTimeValue}
              placeholder="Read Time"
            />
            <Form.Control
              type="input"
              className="my-1"
              ref={readTimeUnit}
              placeholder="Read Unit"
            />
            <Form.Control type="file" className="my-1" ref={cover} />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={submitForm}>
                Post
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default NewPostModal;
