const TextAreaInput = (props) => {
  return (
    <textarea
      {...props}
      className={`dark:bg-blackPrimary bg-white dark:text-whiteSecondary text-blackPrimary w-full h-40 indent-2 outline-none border-gray-700 border dark:focus:border-gray-600 focus:border-gray-400 dark:hover:border-gray-600 hover:border-gray-400 py-2 ${props.className || ''}`}
    ></textarea>
  );
};

export default TextAreaInput;
