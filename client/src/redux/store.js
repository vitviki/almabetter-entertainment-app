import { configureStore } from "@reduxjs/toolkit";
import { tmdbCoreAPI } from "./services/tmdbCore";
import popularReducer from "./features/popularListSlice";
import userReducer from "./features/userSlice";
import searchReducer from "./features/searchSlice";

const store = configureStore({
  reducer: {
    popular: popularReducer,
    user: userReducer,
    search: searchReducer,
    [tmdbCoreAPI.reducerPath]: tmdbCoreAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbCoreAPI.middleware),
});

export default store;
