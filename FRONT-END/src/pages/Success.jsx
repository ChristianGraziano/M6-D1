import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "../middlerwares/ProtectedRoutes";
import "../style/successPageStyle.css";
import SpinnerLoading from "../components/SpinnerLoading";

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
      }, 3000);
    }
  }, [token, navigate, session]);

  return (
    <div className="div-success">
      {session ? (
        <div className="welcome-success">Benvenuto {session.username}</div>
      ) : (
        <div>
          {" "}
          <SpinnerLoading />
        </div>
      )}
      <span className=" fw-bold">
        Login con github effettuato con successo sarai reinderizzato alla
        Homepage in pochi secondi...
      </span>
      <SpinnerLoading />
    </div>
  );
};

export default Success;
