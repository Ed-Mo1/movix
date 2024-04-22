import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWQxMjlhYWEzODhjYWNkOGU0OWU2MmE3MDZmMGIzZSIsInN1YiI6IjY2MGYyOTQ4ZDZkYmJhMDE2MzcxMzBiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C0Hb87JNpYArfq5rOgg7McH7zYIJ54RSu16KKsesDKA",
};
export const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),

  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ url, params }) => ({
        url: url,
        headers: headers,
      }),
    }),
    getMoviesGenres: builder.query({
      query: () => ({
        url: `/genre/movie/list`,
        headers: headers,
      }),
    }),
    getTvGenres: builder.query({
      query: () => ({
        url: `/genre/tv/list`,
        headers: headers,
      }),
    }),
    getDetails: builder.query({
      query: (url) => ({
        url: url,
        headers: headers,
      }),
    }),
    getCredits: builder.query({
      query: (url) => ({
        url: `/${url}/credits`,
        headers: headers,
      }),
    }),
    getVideos: builder.query({
      query: (url) => ({
        url: `/${url}/videos`,
        headers: headers,
      }),
    }),
    getSimilar: builder.query({
      query: (url) => ({
        url: `/${url}/similar`,
        headers: headers,
      }),
    }),
    getRecommendations: builder.query({
      query: (url) => ({
        url: `/${url}/recommendations
        `,
        headers: headers,
      }),
    }),
    getExplore: builder.query({
      query: ({ mediaType, params }) => ({
        url: `/discover/${mediaType}`,
        headers: headers,
        params: params,
      }),
    }),
    getSearch: builder.query({
      query: (params) => ({
        url: '/search/multi',
        headers: headers,
        params: params,
      }),
    })
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesGenresQuery,
  useGetTvGenresQuery,
  useGetDetailsQuery,
  useGetCreditsQuery,
  useGetVideosQuery,
  useGetSimilarQuery,
  useGetRecommendationsQuery,
  useGetExploreQuery,
  useGetSearchQuery
} = moviesApi;
