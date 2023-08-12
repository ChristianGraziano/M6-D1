import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AlertDanger from "../components/AlertDanger";

const endpoint = "http://localhost:5050";

const initialState = {
  authorsArray: [],
  author: null,
  status: "idle",
};

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Chiamata POST
      .addCase(authorPost.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(authorPost.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(authorPost.pending, (state, action) => {
        state.status = "pending";
      })

      //Chiamata GET
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.authorsArray = action.payload;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getAuthors.pending, (state, action) => {
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
      const res = await axios.post(` ${endpoint}/register/authors/`, form, {
        Headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAuthors = createAsyncThunk("authors/Get", async () => {
  try {
    const res = await axios.get(`${endpoint}/authors`);
    if (!res) {
      console.log(`HTTP error! status: ${res.status}`);
    }
    console.log(res.data.users);
    return res.data.users;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// chiamata GET per carcare l'autore con id

export default authorSlice.reducer;
