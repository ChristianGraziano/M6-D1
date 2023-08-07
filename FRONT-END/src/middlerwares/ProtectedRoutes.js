import React, { useEffect } from "react";
import Login from "../pages/Login";
import { useNavigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const auth = () => {
  return JSON.parse(localStorage.getItem("userLoggedIn"));
};

export const useSession = () => {
  const session = auth();
  console.log(session);
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  }, [navigate, session]);
  return decodedSession;
};

const ProtectedRoutes = () => {
  const isAuthorized = auth();
  const session = useSession();

  return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
