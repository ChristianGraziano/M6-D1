import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AlertDanger from "../components/AlertDanger";

const initialState = {
  author: null,
  status: "idle",
};

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authorPost.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(authorPost.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(authorPost.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export const authorPost = createAsyncThunk(
  "author/register",
  async (author) => {
    const form = new FormData();
    form.append("name", author.name);
    form.append("surname", author.surname);
    form.append("password", author.password);
    form.append("email", author.email);
    form.append("birthdayDate", author.birthdayDate);
    form.append("avatar", author.avatar);

    try {
      const res = await axios.post(
        "http://localhost:5050/register/authors/",
        form,
        {
          Headers: { "Content Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default authorSlice.reducer;
