import { useParams } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { Sidebar } from "../components";
import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
} from "../redux/services/tmdbCore";
import Button from "../components/Button";
import { getImgURL } from "../constants/constants";

const Pill = ({ text, bgColor, textColor }) => {
  return (
    <div
      className={`flex justify-between items-center border border-white rounded-lg md:px-1.5 md:py-.5 px-1 ${bgColor} ${textColor} `}
    >
      <p className="md:body-s body-xs font-semibold">{text}</p>
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();

  // Get movie details
  const {
    data: movieDetailsData,
    status: movieDetailsStatus,
    error: movieDetailsError,
  } = useGetMovieDetailsQuery(id);

  // Get movie cast
  const {
    data: movieCastData,
    status: movieCastStatus,
    error: movieCastError,
  } = useGetMovieCreditsQuery(id);

  return (
    <div className="flex gap-3 lg:flex-row flex-col">
      <Sidebar />
      <section className="flex lg:gap-10 gap-14 w-full">
        <div className="lg:w-[40%] flex justify-center lg:items-center">
          <img
            src={getImgURL(movieDetailsData?.poster_path)}
            alt="poster"
            className="lg:w-[500px] lg:h-[750px] md:w-[342px] md:h-[513px] w-[185px] h-[278px] rounded-lg shadow-xl"
          />
        </div>
        <div className="w-[60%] flex flex-col items-start gap-3  ml-[-20px] h-[calc(100vh-70px)] overflow-y-scroll no-scrollbar">
          <h1 className="text-white md:text-[40px] text-[20px] tracking-wide uppercase">
            {movieDetailsData?.title}
          </h1>
          <h3 className="md:heading-s heading-xs text-gray-300 mb-5">
            {movieDetailsData?.tagline}
          </h3>
          <div className="w-full flex flex-wrap xl:justify-start justify-between xl:gap-40 md:gap-10 gap-5 items-center mb-10">
            <div className="flex flex-col items-start gap-1">
              <h4 className="md:heading-xs heading-2xs text-gray-500 font-semibold">
                Runtime
              </h4>
              <p className="md:heading-s heading-xs text-white font-semibold">
                {movieDetailsData?.runtime} minutes
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="md:heading-xs heading-2xs text-gray-500 font-semibold">
                Language
              </h4>
              <p className="md:heading-s heading-xs text-white font-semibold">
                {movieDetailsData?.spoken_languages[0].english_name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="md:heading-xs heading-2xs text-gray-500 font-semibold">
                Year
              </h4>
              <p className="md:heading-s heading-xs text-white font-semibold">
                {movieDetailsData?.release_date.substr(0, 4)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="md:heading-xs heading-2xs text-gray-500 font-semibold">
                Status
              </h4>
              <p className="md:heading-s heading-xs text-white font-semibold">
                {movieDetailsData?.status}
              </p>
            </div>
          </div>
          {/* Genres */}
          <div className="flex flex-col gap-2 justify-start mb-10 flex-wrap">
            <h4 className="md:heading-s heading-xs tracking-wide text-white font-semibold">
              Genres
            </h4>
            <div className="flex md:justify-between justify-start items-center md:gap-3 gap-1 flex-wrap">
              {movieDetailsData?.genres.map((genre) => (
                <Pill
                  key={genre.id}
                  text={genre.name}
                  bgColor={"bg-white"}
                  textColor={"text-black"}
                />
              ))}
            </div>
          </div>
          {/* Synopsis */}
          <div className="w-full flex flex-col gap-3 mb-10">
            <h4 className="heading-s tracking-wide text-white font-semibold">
              Synopsis
            </h4>
            <p className="text-white body-m">{movieDetailsData?.overview}</p>
          </div>

          {/* Cast */}
          <div className="w-full flex flex-col gap-3 mb-5">
            <h4 className="heading-s tracking-wide text-white font-semibold">
              Cast
            </h4>
            <div className="flex flex-wrap gap-2">
              {movieCastData?.cast.map((c) => (
                <Pill key={c.id} text={c.name} textColor={"text-white"} />
              ))}
            </div>
          </div>
          <a href={movieDetailsData?.homepage} target="_blank">
            <Button
              text={"Website"}
              bgColor={"bg-grayBlue"}
              textColor={"text-white"}
              fontDetail={"font-semibold"}
              icon={<FaLink className="w-5" />}
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
