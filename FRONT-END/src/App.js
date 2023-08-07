import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoutes from "./middlerwares/ProtectedRoutes";
import Login from "./pages/Login";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/success/:token" element={<Success />} />

        <Route element={<ProtectedRoutes />}>
          //tutte le rottte qui dentro saranno protette
          <Route path="/homepage" element={<Homepage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
