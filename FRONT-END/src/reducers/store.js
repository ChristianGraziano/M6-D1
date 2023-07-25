import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    blogPosts: postSlice,
  },
});

export default store;
