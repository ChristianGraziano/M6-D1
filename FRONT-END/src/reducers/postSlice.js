import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = "http://localhost:5050/posts";

const initialState = {
  postsArray: [],
  status: "idle",
  singlePost: {},
};

const postSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    filterPosts: (state, action) => {
      state.postsArray = state.postsArray.filter((post) => {
        return post.title.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
  }, // per gestire funzioni sincrone
  extraReducers: (builder) => {
    builder
      //chiamata GET
      .addCase(getBlogPost.fulfilled, (state, action) => {
        state.postsArray = action.payload;
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
      })

      //Chiamata Delete
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.postsArray = state.postsArray.filter(
          (post) => post._id !== action.payload
        );
      })

      //Chiamata per cercare un post ID
      .addCase(blogPostById.fulfilled, (state, action) => {
        state.singlePost = action.payload;
      })
      .addCase(blogPostById.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(blogPostById.rejected, (state, action) => {
        state.status = "error";
      });

    //Chiamata per cercare un post in base al titolo
  },
});

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
    try {
      const res = await fetch(`${endpoint}/create`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
    } catch (error) {
      console.log(error);
    }
  }
);

//chiamata per la ricerca tramite il titolo del post!
// export const searchBlogPost = createAsyncThunk(
//   "searchBlogPost/get",
//   async (payload) => {
//     try {
//       const res = await axios.get(`${endpoint}/title?postTitle=${payload}`);
//       if (!res) {
//         console.log(`HTTP error! status: ${res.status}`);
//       }
//       console.log(res.data.post);
//       return res.data.post;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const getBlogPost = createAsyncThunk("blogPost/GET", async () => {
  try {
    const res = await axios.get(`${endpoint}`);
    if (!res) {
      console.log(`HTTP error! status: ${res.status}`);
    }
    console.log(res.data.post);
    return res.data.post;
  } catch (error) {
    console.log(error);
  }
});

export const deleteBlogPost = createAsyncThunk(
  "blogPost/Delete",
  async (postId) => {
    try {
      const res = await axios.delete(`${endpoint}/${postId}`);
      return res.data.posts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const blogPostById = createAsyncThunk(
  "blogPosts/getById",
  async (id) => {
    try {
      const res = await axios.get(`${endpoint}/` + id);
      if (!res) {
        console.log(`HTTP error! status: ${res.status}`);
      }
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { filterPosts } = postSlice.actions;
export default postSlice.reducer;
