import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = " http://localhost:5050/posts";

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

export const postBlogPosts = createAsyncThunk(
  "blogPost/POST",
  async (postPayload) => {
    const data = new FormData();
    data.append("category", postPayload.category);
    data.append("title", postPayload.title);
    data.append("cover", postPayload.cover);
    data.append("readTimeValue", postPayload.readTime.value);
    data.append("readTimeUnit", postPayload.readTime.unit);
    data.append("author", postPayload.author);
    data.append("content", postPayload.content);

    const res = await fetch(`${endpoint}/create`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
  }
);
