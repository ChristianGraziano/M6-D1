import React from "react";
import NavigationBar from "../components/NavigationBar";
import Welcome from "../components/Welcome";
import PostBoard from "../components/PostBoard";
const Homepage = () => {
  return (
    <>
      <NavigationBar />
      <Welcome />
      <PostBoard />
    </>
  );
};

export default Homepage;
