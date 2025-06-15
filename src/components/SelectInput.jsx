import { nanoid } from "nanoid";

const SelectInput = (props) => {
  const { selectList, value, onChange, className } = props;

  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full h-10 dark:bg-blackPrimary bg-white border border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 pl-3 pr-8 cursor-pointer dark:hover:border-gray-500 hover:border-gray-400 ${className || ''}`}
    >
      {selectList &&
        selectList.map((item) => {
          const { value, label } = item;
          return (
            <option key={nanoid()} value={value}>
              {label}
            </option>
          );
        })}
    </select>
  );
};

export default SelectInput;
