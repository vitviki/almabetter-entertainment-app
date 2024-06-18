import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import {
  setFavoriteMovies,
  setFavoriteTVShows,
} from "../redux/features/userSlice";
import { API_END_POINT } from "../constants/constants";

const Bookmark = ({ element, type }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // This function will first check the type of element that is being processed.
  // Then we'll create an object wit
  // - id
  // - title/name
  // - backdrop_path
  // - release_date/first_air_date
  // - type
  // - adult (flag)
  // After creating the object, we will call appropriate API function to
  // add the object inside User document in MongoDB
  const handleClick = async () => {
    if (!user) {
      toast.error("Please login to add to favorites");
    } else {
      switch (type) {
        case "movie":
          try {
            const movieData = {
              id: element.id,
              title: element.title,
              backdrop_path: element.backdrop_path,
              release_date: element.release_date,
              type: type,
              adult: element.adult,
            };

            // Make a call to the backend API
            const res = await axios.put(
              `${API_END_POINT}/api/v1/user/${user._id}/addRemoveFavoriteMovies`,
              movieData,
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );

            // Update the current user's state
            dispatch(setFavoriteMovies(res.data.user.favoriteMovies));
          } catch (error) {
            toast.error(error.response.data.message);
          }
          break;
        default:
          try {
            const tvData = {
              id: element.id,
              title: element.name,
              backdrop_path: element.backdrop_path,
              release_date: element.first_air_date,
              type: type,
              adult: element.adult,
            };

            // Make a call to the backend API
            const res = await axios.put(
              `${API_END_POINT}/api/v1/user/${user._id}/addRemoveFavoriteTV`,
              tvData,
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );

            // Update the current user's state
            dispatch(setFavoriteTVShows(res.data.user.favortiteTVs));
          } catch (error) {
            toast.error(error.response.data.message);
          }
      }
    }
  };

  // Check if the element is already in favorites.
  const checkFavorites = () => {
    if (user) {
      for (let movie of user?.favoriteMovies) {
        if (movie.id === element.id) return true;
      }

      for (let show of user?.favortiteTVs) {
        if (show.id === element.id) return true;
      }
    }

    return false;
  };

  return (
    <div
      className="absolute top-1 right-1 lg:w-10 lg:h-10 w-7 h-7 rounded-full bg-black bg-opacity-30 flex justify-center items-center"
      title="Add to favorites"
      onClick={handleClick}
    >
      {checkFavorites() ? (
        <IoBookmark className="lg:text-xl text-base text-gray-300" />
      ) : (
        <IoBookmarkOutline className="lg:text-xl text-base text-gray-300" />
      )}
      <Toaster />
    </div>
  );
};

export default Bookmark;
