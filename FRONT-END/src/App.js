import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoutes from "./middlerwares/ProtectedRoutes";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />

        <Route element={<ProtectedRoutes />}>
          //tutte le rottte qui dentro saranno protette
          <Route exact path="/homepage" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
