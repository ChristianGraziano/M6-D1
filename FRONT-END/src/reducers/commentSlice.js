import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = "http://localhost:5050/comments";

const initialState = {
  commentsArray: [],
  commentsArrayByPost: [],
  status: "idle",
  singleComment: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Chiamata GET per vedere tutti i Commenti
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsArray = action.payload;
        state.status = "success";
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "error";
      })

      //Chiamata GET by PostID
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.commentsArrayByPost = action.payload;
        state.status = "success";
      })
      .addCase(fetchCommentsByPost.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.status = "error";
      })

      //Chiamata POST per creare un nuovo commento
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentsArray.push(action.payload);
        state.status = "idle";
      })
      .addCase(createComment.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getComments = createAsyncThunk("comments/GET", async () => {
  try {
    const res = await axios.get(`${endpoint}`);
    if (!res) {
      console.log(`HTTP error! status: ${res.status}`);
    }
    console.log(res.data);
    return res.data.comments;
  } catch (error) {
    console.log(error);
  }
});

export const fetchComments = createAsyncThunk("fetchComments/GET", async () => {
  try {
    const res = await axios.get(`${endpoint}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchCommentsByPost = createAsyncThunk(
  "fetchCommentsByPostID/GET",
  async (postId) => {
    try {
      const res = await axios.get(`${endpoint}/post/${postId}`);
      return res.data.comments;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createComment = createAsyncThunk(
  "createComment/POST",
  async (newComment) => {
    const form = new FormData();
    form.append("");
    try {
      const res = await axios.post(`${endpoint}/create`, newComment);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default commentsSlice.reducer;
