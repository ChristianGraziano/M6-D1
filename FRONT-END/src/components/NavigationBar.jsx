import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthorOffCanvas from "./AuthorOffCanvas";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();

  const redirectHomeOnClick = () => {
    navigate("/homepage");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand> Travel Blog </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1" onClick={redirectHomeOnClick}>
              Home
            </Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <AuthorOffCanvas />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
