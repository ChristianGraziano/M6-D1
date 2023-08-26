import React, { useState } from "react";
import "../style/authorProfileStyle.css";
import { FaTrashAlt } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { deleteAuthor, getAuthors } from "../reducers/authorSlice";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const AuthorProfile = ({ user }) => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("userLoggedIn"));
  const tokenDecoded = jwtDecode(token);

  console.log(tokenDecoded.id);

  const handleDelete = () => {
    dispatch(deleteAuthor(user._id)).then(() => dispatch(getAuthors()));
  };

  //funzioni della modale
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="me-2 d-flex ">
      <img
        className="img-author-profile me-3"
        src={user.avatar}
        alt="avatarAuthor"
      />
      <div className="d-flex flex-column justify-content-center align-item-center fs-4">
        {user.name} {user.surname}
      </div>
      {user._id === tokenDecoded.id && (
        <div className="d-flex justify-content-end h-50 m-auto">
          <Button variant="dark" onClick={handleShow}>
            <FaTrashAlt />
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>confirm account deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              attention! Are you sure you want to remove your account and lose
              all your data?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                confirm
              </Button>
            </Modal.Footer>
          </Modal>

          {/* <Button className="button-trash" onClick={handleDelete}>
            <FaTrashAlt />
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;
