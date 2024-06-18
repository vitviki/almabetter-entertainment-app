import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTvSearchResults } from "../redux/features/searchSlice";
import { setPopularTV } from "../redux/features/popularListSlice";
import { Sidebar } from "../components";
import { SearchBar, Loader, ElementCard } from "../components";
import { TMDB_HOME, options } from "../constants/constants";

const TV = () => {
  const dispatch = useDispatch();
  const { popularTV } = useSelector((store) => store.popular);
  const { tvSearchResults, searchKeyword } = useSelector(
    (store) => store.search
  );

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

  if (popularTV === null) {
    populateTV();
  }

  useEffect(() => {
    dispatch(setTvSearchResults(""));
  }, []);
  return (
    <div className="flex gap-3 lg:flex-row flex-col ">
      <Sidebar />
      <div className="flex flex-col gap-8 py-3 px-3 h-[calc(100vh-70px)] lg:w-[calc(100vw-150px)] overflow-y-scroll no-scrollbar">
        <SearchBar placeHolderText={"Search for TV shows"} searchFor={"tv"} />
        {tvSearchResults ? (
          <section>
            <h1 className="heading-l text-gray-300 mb-3">
              Found {tvSearchResults?.length} results for '{searchKeyword}'{" "}
            </h1>
            <div className="flex gap-8 h-full flex-wrap md:justify-start justify-center">
              {tvSearchResults?.map((show) => (
                <ElementCard element={show} type={"TV"} key={show.id} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h1 className="md:heading-l heading-m text-gray-300 mb-3 text-left">
              Popular TV Shows
            </h1>
            <div className="flex sm:gap-8 gap-6 h-full flex-wrap justify-start">
              {popularTV?.map((show) => (
                <ElementCard element={show} type={"TV"} key={show.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TV;
