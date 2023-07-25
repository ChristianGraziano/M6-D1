import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = " http://localhost:5050/posts/create";

const initialState = {
  postsArray: [],
  status: "idle",
};

const postSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {}, // per gestire funzioni sincrone
  extraReducers: (builder) => {
    builder

      // Chiamata POST
      .addCase(postBlogPosts.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(postBlogPosts.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(postBlogPosts.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default postSlice.reducer;

export const postBlogPosts = createAsyncThunk("blogPost/post", async () => {});
