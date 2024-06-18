import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdMovie } from "react-icons/md";
import { TbBrandWindows } from "react-icons/tb";
import { CiLogout, CiLogin } from "react-icons/ci";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { IoBookmark } from "react-icons/io5";
import { setUser } from "../redux/features/userSlice";
import avatar from "../assets/avatar.png";
import { API_END_POINT } from "../constants/constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      const res = await axios.get(`${API_END_POINT}/api/v1/user/logout`);
      console.log(res);
      if (res.data.success) {
        console.log("hello");
        dispatch(dispatch(setUser(null)));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex lg:flex-col lg:w-[100px] min-w-[100px] lg:h-[calc(100vh-70px)] justify-between items-center bg-darkBlue lg:px-0 px-5 py-5 rounded-2xl">
      <div className="flex lg:flex-col w-[50%] h-[40%] md:gap-0 gap-10 justify-between items-center ">
        <Link to="/">
          <MdMovie
            className="text-orange md:text-4xl text-3xl "
            title="Movie App"
          />
        </Link>
        <div className="flex lg:flex-col gap-8 md:text-2xl text-xl">
          <Link to="/home">
            <TbBrandWindows
              className={`${
                pathname === "/home" ? "text-white" : "text-grayBlue"
              } hover:text-orange`}
              title="Discover"
            />
          </Link>
          <Link to="/movies">
            <TbMovie
              className={`${
                pathname === "/movies" ? "text-white" : "text-grayBlue"
              } hover:text-orange`}
              title="Movies"
            />
          </Link>
          <Link to="/tv">
            <PiTelevisionBold
              className={`${
                pathname === "/tv" ? "text-white" : "text-grayBlue"
              } hover:text-orange`}
              title="TV"
            />
          </Link>
          <Link to="/favorites">
            <IoBookmark
              className="text-grayBlue hover:text-orange"
              title="Favorites"
            />
          </Link>
        </div>
      </div>

      {user ? (
        <div className="relative flex lg:flex-col justify-center gap-5">
          <img
            src={
              user.profilePicturePath !== "undefined"
                ? `${API_END_POINT}/assets/${user.profilePicturePath}`
                : avatar
            }
            alt="profile_picture"
            className="md:w-10 md:h-10 w-5 h-5 rounded-full object-cover cursor-pointer"
            title={`${user.firstName + " " + user.lastName}`}
            onClick={() => setIsOpen((prev) => (prev = !prev))}
          />
          {isOpen && (
            <div className="absolute md:-top-10 top-6 left-0 flex justify-start z-10">
              <CiLogout
                className="text-orange md:text-3xl text-2xl cursor-pointer"
                title="Sign Out"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link to="/login">
            <CiLogin
              className="text-orange md:text-3xl text-2xl"
              title="Sign In"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
