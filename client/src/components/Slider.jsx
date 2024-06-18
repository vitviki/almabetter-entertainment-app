import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { getImgURL } from "../constants/constants";
import Bookmark from "./Bookmark";
import Play from "./Play";
import "swiper/css";

const Slider = ({ slides }) => {
  const navigate = useNavigate();

  function handlePlayClick(slide) {
    const url =
      slide.media_type === "movie" ? `/movies/${slide.id}` : `/tv/${slide.id}`;
    navigate(url);
  }

  return (
    <Swiper
      direction={"horizontal"}
      className=""
      mousewheel={{ enabled: true, sensitivity: 3 }}
      modules={[Mousewheel]}
      breakpoints={{
        320: {
          slidesPerView: 1.2,
          spaceBetween: 50,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 30,
        },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="">
          <div className="relative animate-slideright  group cursor-pointer w-full ">
            <Bookmark element={slide} type={slide?.media_type} />
            <div className="w-full group">
              <div
                className={`absolute top-1/2 left-1/2 justify-center items-center group-hover:flex hidden`}
              >
                <Play handleClick={() => handlePlayClick(slide)} />
              </div>
              <img
                src={getImgURL(slide.backdrop_path)}
                alt={slide.title}
                className="w-full object-fit rounded-lg"
              />
            </div>

            <div className="flex flex-col absolute bottom-2 left-2">
              <div className="flex gap-1 items-center lg:text-base text-xs text-gray-300 mix-blend-difference">
                <span>
                  {slide?.release_date
                    ? slide?.release_date?.substr(0, 4)
                    : slide?.first_air_date?.substr(0, 4)}
                </span>
                <GoDotFill className="text-xs" />
                <div className="flex gap-1 items-center">
                  {slide?.media_type === "movie" ? (
                    <TbMovie />
                  ) : (
                    <PiTelevisionBold />
                  )}
                  {slide?.media_type === "movie" ? (
                    <span>Movie</span>
                  ) : (
                    <span>TV</span>
                  )}
                </div>
                <GoDotFill className="text-xs" />
                <span>{slide?.adult === false ? "PG" : "R"}</span>
              </div>
              <h2 className="text-white lg:heading-m md:heading-s heading-2xs font-semibold mix-blend-difference">
                {slide.title ? slide.title : slide.name}
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
