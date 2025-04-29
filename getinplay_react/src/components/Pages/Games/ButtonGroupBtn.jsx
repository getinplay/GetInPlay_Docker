import PropTypes from "prop-types";

ButtonGroupBtn.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  index: PropTypes.number,
};

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
