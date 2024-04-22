import { createSlice } from "@reduxjs/toolkit";
import { moviesApi } from "./moviesApi";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    genres: {
      movie: [],
      tv: [],
    },
    url: {
      profile: "https://image.tmdb.org/t/p/original/",
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      moviesApi.endpoints.getMovies.matchFulfilled,
      (state, action) => {
        state.url = {
          ...action.payload,
          profile: "https://image.tmdb.org/t/p/original/",
        };
      }
    );

    builder.addMatcher(
      moviesApi.endpoints.getMoviesGenres.matchFulfilled,
      (state, { payload: { genres } }) => {
        state.genres.movie = genres;
      }
    );
    builder.addMatcher(
      moviesApi.endpoints.getTvGenres.matchFulfilled,
      (state, { payload: { genres } }) => {
        state.genres.tv = genres;
      }
    );
  },
});

export default homeSlice.reducer;
