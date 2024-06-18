export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTdiZmNmNGVmMzdlNjc1Njk5YzM2NGZiZjc3MGMyNSIsInN1YiI6IjY2NWYyYjRlZjRjYjJlMjY2NDFjMzViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vf6G_feF4ZYQb_nyoiqG-KMvClG1Np6IeMIaq5WL58M",
  },
};

export const API_END_POINT = "http://localhost:5000";
export const TMDB_HOME = "https://api.themoviedb.org/3";
export const SEACH_MOVIES_URL =
  "https://api.themoviedb.org/3/search/movie?query=";

export function getImgURL(uri) {
  return "https://image.tmdb.org/t/p/w780" + uri;
}
