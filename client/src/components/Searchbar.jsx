import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  setMovieSearchResults,
  setTvSearchResults,
  setSearchKeyword,
} from "../redux/features/searchSlice";
import { options, SEACH_MOVIES_URL } from "../constants/constants";
import axios from "axios";

const Searchbar = ({ placeHolderText, searchFor }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSearch() {
    if (searchTerm.length > 3) {
      dispatch(setSearchKeyword(searchTerm));
      switch (searchFor) {
        case "movies":
          try {
            const res = await axios.get(
              `${SEACH_MOVIES_URL}${searchTerm}&include_adult=false&language=en-US&page=1`,
              options
            );
            const movies = res?.data?.results;
            dispatch(setMovieSearchResults(movies));
          } catch (error) {
            toast.error(error.message);
          }
          break;
        case "tv":
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
              options
            );
            const shows = res?.data?.results;
            dispatch(setTvSearchResults(shows));
          } catch (error) {
            toast.error(error.message);
          }
          break;
        default:
          const res = await axios.get(
            `${SEACH_MOVIES_URL}${searchTerm}&include_adult=false&language=en-US&page=1`,
            options
          );
          const movies = res?.data?.results;
          dispatch(setMovieSearchResults(movies));
          break;
      }
      setSearchTerm("");
    } else {
      toast.error("Search term should be more than three letters");
    }
  }

  return (
    <div className="relative flex gap-3 w-full h-[40px] bg-darkBlueWithBorder">
      <FiSearch
        className="text-2xl text-white absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder={placeHolderText}
        value={searchTerm}
        onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : "")}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="font-light pl-16 md:text-xl tracking-wide w-[100%] bg-darkBlueWithBorder placeholder:text-gray-400 text-white focus:outline-none"
      />
      <Toaster />
    </div>
  );
};

export default Searchbar;
