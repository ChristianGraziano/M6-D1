import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import { postBlogPosts } from "../reducers/postSlice";

function NewPostModal() {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [readTimeValue, setReadTimeValue] = useState("");
  const [readTimeUnit, setReadTimeUnit] = useState("");
  const [cover, setCover] = useState(null);

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };
  const submitForm = async (e) => {
    e.preventDefault();

    const postPayload = {
      category: category,
      title: title,
      author: author,
      content: content,
      readTime: {
        value: readTimeValue,
        unit: readTimeUnit,
      },
      cover: cover,
    };

    dispatch(postBlogPosts(postPayload));
  };

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
          <form onSubmit={submitForm}>
            <input
              placeholder="category"
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              placeholder="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="cover"
              type="file"
              onChange={handleFileChange}
            />
            <input
              placeholder="read time value"
              type="text"
              onChange={(e) => setReadTimeValue(e.target.value)}
            />
            <input
              placeholder="read time unit"
              type="text"
              onChange={(e) => setReadTimeUnit(e.target.value)}
            />
            <input
              placeholder="author id"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              placeholder="content"
              type="text"
              onChange={(e) => setContent(e.target.value)}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Post
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default NewPostModal;
