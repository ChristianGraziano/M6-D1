import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import NavigatioBar from "./components/NavigationBar";
import NewPostModal from "./components/NewPostModal";

function App() {
  return (
    <BrowserRouter>
      <NavigatioBar />
      <NewPostModal />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
