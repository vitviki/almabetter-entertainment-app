import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbCoreAPI = createApi({
  reducerPath: "tmdbCoreAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTdiZmNmNGVmMzdlNjc1Njk5YzM2NGZiZjc3MGMyNSIsInN1YiI6IjY2NWYyYjRlZjRjYjJlMjY2NDFjMzViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vf6G_feF4ZYQb_nyoiqG-KMvClG1Np6IeMIaq5WL58M"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrending: builder.query({
      query: () => "/trending/all/week?language=en-US",
    }),
    getMovieDetails: builder.query({
      query: (id) => `movie/${id}?language=en-US`,
    }),
    getMovieCredits: builder.query({
      query: (id) => `/movie/${id}/credits?language=en-US`,
    }),
    getTVDetails: builder.query({
      query: (id) => `/tv/${id}?language=en-US`,
    }),
    getTVCredits: builder.query({
      query: (id) => `/tv/${id}/credits?language=en-US`,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetTVDetailsQuery,
  useGetTVCreditsQuery,
} = tmdbCoreAPI;
