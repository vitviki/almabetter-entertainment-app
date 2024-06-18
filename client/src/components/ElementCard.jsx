import { useNavigate } from "react-router-dom";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { getImgURL } from "../constants/constants";
import Bookmark from "./Bookmark";
import Play from "./Play";
import placeholderImg from "../assets/placeholder-image.png";

const ElementCard = ({ element, type }) => {
  const navigate = useNavigate();

  function handlePlayClick() {
    const url =
      type === "movie" ? `/movies/${element.id}` : `/tv/${element.id}`;
    navigate(url);
  }

  return (
    <div className="relative flex flex-col gap-1 justify-start lg:w-[320px] lg:min-w-[320px] md:w-[200px] md:min-w-[200px] w-[130px] min-w-[130px] cursor-pointer animate-slideup group">
      <Bookmark element={element} type={type} />
      <div className="w-full group">
        <div
          className={`absolute lg:top-1/3 sm:top-1/4 top-[20%] left-1/2 justify-center items-center group-hover:flex hidden`}
        >
          <Play handleClick={handlePlayClick} />
        </div>
        <img
          src={
            element.backdrop_path
              ? getImgURL(element.backdrop_path)
              : placeholderImg
          }
          alt="media img"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex gap-1 items-center text-gray-300 text-xs md:text-sm lg:text-base">
          <span>
            {element?.release_date
              ? element?.release_date?.substr(0, 4)
              : element?.first_air_date?.substr(0, 4)}
          </span>
          <GoDotFill className="text-xs" />
          <div className="flex gap-1 items-center">
            {type === "movie" ? <TbMovie /> : <PiTelevisionBold />}
            {type === "movie" ? <span>Movie</span> : <span>TV</span>}
          </div>
          <GoDotFill className="text-xs" />
          <span>{element?.adult === false ? "PG" : "R"}</span>
        </div>
        <h2 className="text-white md:heading-xs heading-2xs font-semibold">
          {element.title ? element.title : element.name}
        </h2>
      </div>
    </div>
  );
};

export default ElementCard;
