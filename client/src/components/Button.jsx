const Button = ({ type, text, bgColor, textColor, icon, fontDetail }) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${fontDetail} shadow-xl border-none md:mt-8 md:mb-5 mt-6 mb-3 md:p-3 p-2 rounded-lg flex gap-4 items-center justify-center`}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
