// thunk x gestire chiamate api
// slice fondamentale x mettere la logica
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: [],
  isLoading: false,
  error: "errore!!",
};

const getAuthors = createAsyncThunk("authors/getAthors", async () => {
  const data = await fetch("http://localhost:5050/authors");
  const response = await data.json();
  return response;
});

const authorSlice = createSlice({
  name: "christian",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload; // valore che passi in argomento al dispach
    },
  },
});
