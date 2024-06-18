import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tvSearchResults: null,
  movieSearchResults: null,
  searchKeyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMovieSearchResults: (state, action) => {
      state.movieSearchResults = action.payload;
    },
    setTvSearchResults: (state, action) => {
      state.tvSearchResults = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const { setMovieSearchResults, setTvSearchResults, setSearchKeyword } =
  searchSlice.actions;
export default searchSlice.reducer;
