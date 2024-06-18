import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { SearchBar, Loader, ElementCard, Slider } from "../components";
import { Sidebar } from "../components";
import { useGetTrendingQuery } from "../redux/services/tmdbCore";
import { setMovieSearchResults } from "../redux/features/searchSlice";
import {
  setPopularMovies,
  setPopularTV,
} from "../redux/features/popularListSlice";
import { TMDB_HOME, options } from "../constants/constants";

const HomePage = () => {
  const dispatch = useDispatch();
  const { movieSearchResults, searchKeyword } = useSelector(
    (store) => store.search
  );
  const { popularMovies, popularTV } = useSelector((store) => store.popular);

  // Fetch trending movies and TV and push it to the redux store.
  const {
    data: trending,
    status: trendingStatus,
    error: trendingError,
  } = useGetTrendingQuery();

  async function populateMovies() {
    try {
      const res = await axios.get(
        `${TMDB_HOME}/movie/popular?language=en-US&page=1`,
        options
      );
      const movies = res?.data?.results;
      dispatch(setPopularMovies(movies));
    } catch (error) {
      console.log(error);
    }
  }

  async function populateTV() {
    try {
      const res = await axios.get(
        `${TMDB_HOME}/tv/popular?language=en-US&page=1`,
        options
      );
      const tv = res?.data?.results;
      dispatch(setPopularTV(tv));
    } catch (error) {
      console.log(error);
    }
  }

  // Get all the popular movies
  // Check to see if we have already gotten the popular movies, if not, the make the API calls.
  if (popularMovies === null) {
    populateMovies();
  }

  if (popularTV === null) {
    populateTV();
  }

  // clear all search results
  useEffect(() => {
    dispatch(setMovieSearchResults(""));
  }, []);

  return (
    <div className="flex gap-3 lg:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-col gap-8 py-3 px-3 h-[calc(100vh-70px)] lg:w-[calc(100vw-150px)] overflow-y-scroll no-scrollbar">
        <SearchBar placeHolderText={"Search for movies or TV series"} />
        {movieSearchResults ? (
          <section>
            <h1 className="heading-l text-gray-300 mb-3">
              Showing results for '{searchKeyword}'{" "}
            </h1>
            <div className="flex gap-8 h-full flex-wrap">
              {movieSearchResults?.map((movie) => (
                <ElementCard element={movie} type={"movie"} key={movie.id} />
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* Trending Movies */}
            {trendingStatus === "fulfilled" && (
              <section>
                <h1 className="heading-l text-gray-300 mb-3">Trending</h1>
                <Slider slides={trending.results} />
              </section>
            )}
            {/* Recommended Movies */}
            <section>
              <h1 className="heading-l text-gray-300 mb-3">
                Recommended for you
              </h1>
              <div className="flex sm:gap-8 gap-6 h-full flex-wrap">
                {popularMovies?.slice(0, 5).map((movie) => (
                  <ElementCard element={movie} type={"movie"} key={movie.id} />
                ))}
                {popularTV?.slice(0, 5).map((show) => (
                  <ElementCard element={show} type={"tv"} key={show.id} />
                ))}
              </div>
              <div className="flex"></div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
