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
      //chiamata GET
      .addCase(getBlogPost.fulfilled, (state, action) => {
        state.postsArray = action.payload.blogPosts;
        state.status = "idle";
      })
      .addCase(getBlogPost.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getBlogPost.rejected, (state, action) => {
        state.status = "error";
      })
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

export const getBlogPost = createAsyncThunk("blogPost/GET", async () => {
  const request = await fetch(`${endpoint}`);
  const result = await request.json();
  return result;
});
