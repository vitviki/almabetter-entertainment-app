import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TMDB_HOME, options } from "../constants/constants";
import { setMovieSearchResults } from "../redux/features/searchSlice";
import { setPopularMovies } from "../redux/features/popularListSlice";
import { Sidebar } from "../components";
import { SearchBar, Loader, ElementCard } from "../components";

const Movies = () => {
  const dispatch = useDispatch();
  const { popularMovies } = useSelector((store) => store.popular);
  const { movieSearchResults, searchKeyword } = useSelector(
    (store) => store.search
  );

  // If the user directly came to this page using a URL, the popular movies object will be null.
  // We'll populate movies manually to populate the store

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
  if (popularMovies === null) {
    populateMovies();
  }

  // Clear the movie result state on every reload
  useEffect(() => {
    dispatch(setMovieSearchResults(""));
  }, []);

  return (
    <div className="flex gap-3 lg:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-col gap-8 py-3 px-3 h-[calc(100vh-70px)] lg:w-[calc(100vw-150px)] overflow-y-scroll no-scrollbar">
        <SearchBar placeHolderText={"Search for movies"} searchFor={"movies"} />
        {movieSearchResults ? (
          <section>
            <h1 className="md:heading-l heading-m text-gray-300 mb-5">
              Found {movieSearchResults?.length} results for '{searchKeyword}'{" "}
            </h1>
            <div className="flex sm:gap-8 gap-3 h-full flex-wrap md:justify-start justify-center">
              {movieSearchResults?.map((movie) => (
                <ElementCard element={movie} type={"movie"} key={movie.id} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h1 className="md:heading-l heading-m text-gray-300 mb-3 text-left">
              Popular movies
            </h1>
            <div className="flex sm:gap-8 gap-6 h-full flex-wrap justify-start">
              {popularMovies?.map((movie) => (
                <ElementCard element={movie} type={"movie"} key={movie.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Movies;
