import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setFavoriteMovies: (state, action) => {
      state.user.favoriteMovies = action.payload;
    },
    setFavoriteTVShows: (state, action) => {
      state.user.favortiteTVs = action.payload;
    },
  },
});

export const {
  setUser,
  setLoading,
  setLoggedIn,
  setFavoriteMovies,
  setFavoriteTVShows,
} = userSlice.actions;
export default userSlice.reducer;
