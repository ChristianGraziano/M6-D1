import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import authorSlice from "./authorSlice";
import commentSlice from "./commentSlice";

const store = configureStore({
  reducer: {
    blogPosts: postSlice,
    author: authorSlice,
    comments: commentSlice,
  },
});

export default store;
