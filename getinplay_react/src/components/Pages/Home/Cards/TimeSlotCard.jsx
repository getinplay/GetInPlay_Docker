import PropTypes from "prop-types";

TimeSlotCard.propTypes = {
  children: PropTypes.node.isRequired,
  isBooked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

function TimeSlotCard({ children, isBooked, onClick }) {
  // const [hovered, setHovered] = useState(false);
  return (
    <div
      // onMouseEnter={() => setHovered((prev) => !prev)}
      // onMouseLeave={() => setHovered((prev) => !prev)}
      onClick={onClick}
      className={`sm:px-3 duration-200 ${
        isBooked
          ? "bg-gray-300 text-gray-100 border-gray-300"
          : "bg-white text-gray-700 border-[#E5E5E5] hover:border-[#4A5BE6] active:border-[#4A5BE6] active:text-white active:bg-[#4A5BE6] focus:bg-[#4A5BE6] focus:text-white hover:bg-[#4A5BE6] hover:text-white cursor-pointer"
      } py-1 mx-[1px] outline-none select-none border-2 text-sm xs:text-base sm:text-lg font-semibold rounded-lg`}>
      {/* {!isBooked && hovered ? "Book Now" : children} */ children}
    </div>
  );
}

export default TimeSlotCard;
