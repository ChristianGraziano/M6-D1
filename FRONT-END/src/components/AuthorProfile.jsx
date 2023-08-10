import React, { useRef } from "react";
import "../style/authorProfileStyle.css";

const AuthorProfile = ({ user }) => {
  return (
    <div className="d-flex justify-content-center align-item-center me-2">
      <img
        className="img-author-profile me-2"
        src={user.avatar}
        alt="avatarAuthor"
      />
      <div className="d-flex flex-column justify-content-center align-item-center fs-4">
        {user.name} {user.surname}
      </div>
    </div>
  );
};

export default AuthorProfile;
