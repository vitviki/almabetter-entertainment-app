import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: null,
  popularTV: null,
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setPopularTV: (state, action) => {
      state.popularTV = action.payload;
    },
  },
});

export const { setPopularMovies, setPopularTV } = popularSlice.actions;

export default popularSlice.reducer;
