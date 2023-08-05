import React, { useState } from "react";
import axios from "axios";
import "../style/loginStyle.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillGithub } from "react-icons/ai";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({});
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5050/login", loginFormData)
      .then((res) => {
        localStorage.setItem("userLoggedIn", JSON.stringify(res.data.token));
      });
    navigate("/homepage");
  };

  return (
    <>
      <div className="div_login">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="d-flex  flex-column justify-content-center align-items-center gap-3 div_form mb-2">
                <div className="div_white p-3">
                  <h3 className="d-flex flex-column align-items-center fw-bold fs-1 text-black ">
                    Login
                  </h3>
                  <form
                    onSubmit={onSubmit}
                    className="d-flex flex-column gap-3"
                  >
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      className=" p-2 rounded me-3 input_style"
                      onChange={(e) =>
                        setLoginFormData({
                          ...loginFormData,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className=" p-2 rounded me-3 input_style"
                      onChange={(e) =>
                        setLoginFormData({
                          ...loginFormData,
                          password: e.target.value,
                        })
                      }
                    />
                    <button
                      type="submit"
                      className="bg bg-success button_login rounded"
                    >
                      Login
                    </button>
                    <button className=" p-2 bg bg-dark text-light rounded shadow mt-4 d-flex align-items-center justify-content-center gap-2">
                      <AiFillGithub className="icon-github" />
                      Login con Github
                    </button>
                  </form>
                </div>
                <RegistrationForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
