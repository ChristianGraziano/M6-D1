import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import { postBlogPosts } from "../reducers/postSlice";
import Form from "react-bootstrap/Form";

function NewPostModal() {
  const dispatch = useDispatch();

  const category = useRef(null);
  const title = useRef(null);
  const author = useRef(null);
  const content = useRef(null);
  const readTimeValue = useRef(null);
  const readTimeUnit = useRef(null);
  const cover = useRef(null);

  const submitForm = async () => {
    const postPayload = {
      category: category.current.value,
      title: title.current.value,
      author: author.current.value,
      content: content.current.value,
      readTime: {
        value: readTimeValue.current.value,
        unit: readTimeUnit.current.value,
      },
      cover: cover.current.files[0],
    };

    dispatch(postBlogPosts(postPayload));
  };

  //funzione della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
            <Form.Control
              type="input"
              className="my-1"
              ref={author}
              placeholder="Author ID"
            />
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
