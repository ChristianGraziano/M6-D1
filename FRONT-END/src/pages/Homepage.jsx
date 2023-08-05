import React from "react";
import NavigationBar from "../components/NavigationBar";
import NewPostModal from "../components/NewPostModal";
import Welcome from "../components/Welcome";
import PostBoard from "../components/PostBoard";

const Homepage = () => {
  return (
    <>
      <NavigationBar />
      <NewPostModal />
      <Welcome />
      <PostBoard />
    </>
  );
};

export default Homepage;
