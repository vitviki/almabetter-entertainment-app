import { useParams } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { Sidebar } from "../components";
import {
  useGetTVDetailsQuery,
  useGetTVCreditsQuery,
} from "../redux/services/tmdbCore";
import Button from "../components/Button";
import { getImgURL } from "../constants/constants";

const Pill = ({ text, bgColor, textColor }) => {
  return (
    <div
      className={`flex justify-between items-center border border-white rounded-lg px-1.5 py-.5 ${bgColor} ${textColor} `}
    >
      <p className="body-s font-semibold">{text}</p>
    </div>
  );
};

const TVDetails = () => {
  const { id } = useParams();

  // Get movie details
  const {
    data: tvDetailsData,
    status: tvDetailsStatus,
    error: tvDetailsError,
  } = useGetTVDetailsQuery(id);

  // Get movie cast
  const {
    data: tvCastData,
    status: tvCastStatus,
    error: tvCastError,
  } = useGetTVCreditsQuery(id);

  return (
    <div className="flex gap-3 lg:flex-row flex-col">
      <Sidebar />
      <section className="flex gap-10 w-full">
        <div className="lg:w-[40%] flex justify-center lg:items-center">
          <img
            src={getImgURL(tvDetailsData?.poster_path)}
            alt="poster"
            className="lg:w-[500px] lg:h-[750px] md:w-[342px] md:h-[513px] rounded-lg shadow-xl"
          />
        </div>
        <div className="w-[60%] flex flex-col items-start gap-3  ml-[-20px] h-[calc(100vh-70px)] overflow-y-scroll no-scrollbar">
          <h1 className="text-white text-[40px] tracking-wide uppercase">
            {tvDetailsData?.original_name}
          </h1>
          <h3 className="heading-s text-gray-300 mb-5">
            {tvDetailsData?.tagline}
          </h3>
          <div className="w-full flex flex-wrap xl:justify-start justify-between xl:gap-40 gap-10 items-center mb-10">
            <div className="flex flex-col items-start gap-1">
              <h4 className="heading-xs text-gray-500 font-semibold">
                Language
              </h4>
              <p className="heading-s text-white font-semibold">
                {tvDetailsData?.spoken_languages[0]?.english_name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="heading-xs text-gray-500 font-semibold">
                First Air
              </h4>
              <p className="heading-s text-white font-semibold">
                {tvDetailsData?.first_air_date}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="heading-xs text-gray-500 font-semibold">
                Last Air
              </h4>
              <p className="heading-s text-white font-semibold">
                {tvDetailsData?.last_air_date}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="heading-xs text-gray-500 font-semibold">Status</h4>
              <p className="heading-s text-white font-semibold">
                {tvDetailsData?.status}
              </p>
            </div>
          </div>
          {/* Genres */}
          <div className="flex flex-col gap-2 justify-start mb-10">
            <h4 className="heading-s tracking-wide text-white font-semibold">
              Genres
            </h4>
            <div className="flex justify-between items-center gap-3">
              {tvDetailsData?.genres.map((genre) => (
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
            <p className="text-white body-m">{tvDetailsData?.overview}</p>
          </div>

          {/* Cast */}
          <div className="w-full flex flex-col gap-3 mb-5">
            <h4 className="heading-s tracking-wide text-white font-semibold">
              Cast
            </h4>
            <div className="flex flex-wrap gap-2">
              {tvCastData?.cast.map((c) => (
                <Pill key={c.id} text={c.name} textColor={"text-white"} />
              ))}
            </div>
          </div>
          <a href={tvDetailsData?.homepage} target="_blank">
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

export default TVDetails;
