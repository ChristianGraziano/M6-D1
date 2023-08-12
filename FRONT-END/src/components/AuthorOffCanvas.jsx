import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineUser } from "react-icons/ai";
import { useSession } from "../middlerwares/ProtectedRoutes";
import { getAuthors, filterAuthor } from "../reducers/authorSlice";
import AuthorProfile from "./AuthorProfile";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import "../style/authorProfileStyle.css";
import Form from "react-bootstrap/Form";
import { FiUsers } from "react-icons/fi";

function AuthorOffCanvas() {
  const session = useSession();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { authorsArray } = useSelector((state) => state.author);

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value === "") {
      dispatch(getAuthors());
    }
    setSearchTerm(value);
  };

  const filteredResult = (e) => {
    e.preventDefault();
    dispatch(filterAuthor(searchTerm));
  };

  useEffect(() => {
    dispatch(getAuthors());
  }, []);

  //funzione di bootstrap x modale del tasto
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {session && (
        <Button variant="success" onClick={handleShow}>
          <div className="d-flex justify-content-center  gap-2">
            See Authors
            <AiOutlineUser style={{ fontSize: "1.2rem" }} />
          </div>
        </Button>
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="background-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className=" fw-bold">
            Authors <FiUsers className="ms-1" />{" "}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={filteredResult} className="d-flex mt-2 mb-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch}
            />
            <Button onClick={filteredResult} variant="outline-success">
              Search
            </Button>
          </Form>
          <section className="d-flex flex-column justify-content-center align-item-center gap-3">
            {authorsArray &&
              authorsArray.map((user) => {
                return <AuthorProfile key={nanoid()} user={user} />;
              })}
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthorOffCanvas;
