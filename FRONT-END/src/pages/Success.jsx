import React, { useEffect } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import { useSession } from "../middlerwares/ProtectedRoutes";

const Success = () => {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();

  const saveUserLocalStorage = () => {
    localStorage.setItem("userLoggedIn", JSON.stringify(token));
  };
  const session = useSession();
  console.log(session);
  useEffect(() => {
    if (token) {
      saveUserLocalStorage(token);

      setTimeout(() => {
        navigate("/homepage");
      }, 5000);
    }
  }, [token, navigate, session]);

  return (
    <div className="w-100 h-100">
      <div>Benvenuto {session.username}</div>
    </div>
  );
};

export default Success;
