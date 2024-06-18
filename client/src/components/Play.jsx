import { FaPlay } from "react-icons/fa";

const Play = ({ handleClick }) => {
  return (
    <FaPlay
      className="text-gray-300 lg:text-2xl text-xl"
      onClick={handleClick}
      title="Play"
    />
  );
};

export default Play;
