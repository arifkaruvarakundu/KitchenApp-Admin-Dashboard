import { Link } from "react-router-dom";

const WhiteButton = ({
  link,
  text,
  width = "48",
  py = "2",
  textSize = "base",
  children,
  onClick,
}) => {
  const classNames = `dark:bg-whiteSecondary bg-blackPrimary w-${width} py-${py} text-${textSize} dark:hover:bg-white hover:bg-gray-800 duration-200 flex items-center justify-center gap-x-2 rounded`;

  if (link) {
    return (
      <Link to={link} className={classNames}>
        {children}
        <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
          {text}
        </span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classNames}>
      {children}
      <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
        {text}
      </span>
    </button>
  );
};

export default WhiteButton;

