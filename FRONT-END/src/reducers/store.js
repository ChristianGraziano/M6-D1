import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import authorSlice from "./authorSlice";

const store = configureStore({
  reducer: {
    blogPosts: postSlice,
    author: authorSlice,
  },
});

export default store;
