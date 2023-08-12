import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { blogPostById } from "../reducers/postSlice";
import Container from "react-bootstrap/Container";
import { nanoid } from "@reduxjs/toolkit";
import SpinnerLoading from "../components/SpinnerLoading";
import "../style/postDetailsStyle.css";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(blogPostById(id));
  }, [dispatch, id]);

  const singlePost = useSelector(
    (state) => state.blogPosts.singlePost.blogPostsById
  );
  console.log(singlePost);

  return (
    <>
      {singlePost ? (
        <Container>
          <div className="my-5">
            <h4>{singlePost.title}</h4>
            <img className=" img-post-details" src={singlePost.cover} alt="" />
            <div>
              <em>
                Di: {singlePost.author.name} {singlePost.author.surname}
              </em>
              {/* <em>
              Read Time: {singlePost.readTime.value} {singlePost.readTime.unit}
            </em> */}
            </div>
            <div>
              <span>Descrizione: {singlePost.content}</span>
            </div>
          </div>
        </Container>
      ) : (
        <div className="d-flex justify-content-center align-items-center div-100vh">
          <SpinnerLoading />;
        </div>
      )}
    </>
  );
};

export default PostDetails;
