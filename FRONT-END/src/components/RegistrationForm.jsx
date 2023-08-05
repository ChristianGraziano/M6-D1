import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { authorPost } from "../reducers/authorSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const RegistrationForm = () => {
  //costanti della modale di bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const name = useRef(null);
  const surname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const birthdayDate = useRef(null);
  const avatar = useRef(null);

  const handleSubmit = () => {
    const data = {
      name: name.current.value,
      surname: surname.current.value,
      email: email.current.value,
      password: password.current.value,
      birthdayDate: birthdayDate.current.value,
      avatar: avatar.current.files[0],
    };

    dispatch(authorPost(data));
  };

  return (
    <>
      <Button
        variant="warning"
        className="p-2 fw-bold fs-4"
        onClick={handleShow}
      >
        Register now!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>NAME</Form.Label>
              <Form.Control type="input" ref={name} placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>SECOND NAME</Form.Label>
              <Form.Control
                type="input"
                ref={surname}
                placeholder="Second Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>EMAIL ADDRESS</Form.Label>
              <Form.Control
                type="email"
                ref={email}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>BIRTH DATE</Form.Label>
              <Form.Control
                type="date"
                ref={birthdayDate}
                placeholder="Enter your birthdate"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>PASSWORD</Form.Label>
              <Form.Control
                type="password"
                ref={password}
                placeholder="Password"
              />
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>AVATAR</Form.Label>
                <Form.Control type="file" ref={avatar} />
              </Form.Group>
            </Form.Group>
            <div className="text-center">
              <Button
                variant="success"
                className="text-light fw-bold"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegistrationForm;
