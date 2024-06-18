import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  Bookmarks,
  Login,
  MovieDetails,
  Movies,
  Signup,
  TV,
  TVDetails,
} from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/tv" element={<TV />} />
      <Route path="/tv/:id" element={<TVDetails />} />
      <Route path="/favorites" element={<Bookmarks />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
