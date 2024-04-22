import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./services/moviesApi";
import homeSlice from "./services/homeSlice";
const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    home: homeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export default store;
