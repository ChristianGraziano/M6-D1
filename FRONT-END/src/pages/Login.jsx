import React, { useState } from "react";
import axios from "axios";
import "../style/loginStyle.css";
import { useNavigate } from "react-router-dom";

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
    <div className="d-flex justify-content-center align-items-center gap-3 div_login gradient">
      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
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
        <button type="submit" className="bg bg-success button_login">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
