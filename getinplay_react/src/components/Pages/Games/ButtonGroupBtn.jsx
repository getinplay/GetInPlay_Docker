import React from "react";

function ButtonGroupBtn({ children, isSelected, onClickHandler, index }) {
  return (
    <button
      onClick={() => onClickHandler(index)}
      className={`sm:text-base text-sm select-none px-2 sm:px-3 outline-none py-1 duration-100 font-medium cursor-pointer rounded-full ${
        isSelected
          ? "bg-[#4A5BE6] text-white font-bold"
          : "font-medium text-gray-600"
      }`}>
      {children}
    </button>
  );
}

export default ButtonGroupBtn;
