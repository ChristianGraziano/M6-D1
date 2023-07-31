import React from "react";
import Login from "../pages/Login";
// import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import Homepage from "../pages/Homepage";

const auth = () => {
  return JSON.parse(localStorage.getItem("userLoggedIn"));
};

// const useSession = () => {
//   const session = auth();
//   const decodedSession = session ? jwtDecode(session) : null;

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!session) {
//       navigate("/", { replace: true });
//     }
//   }, [navigate, session]);
//   return decodedSession;
// };

const protectedRoutes = () => {
  const isAuthorized = auth();

  return isAuthorized ? <Homepage /> : <Login />;
};

export default protectedRoutes;
