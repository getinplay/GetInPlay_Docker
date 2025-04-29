import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

TestimonialCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  star: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

function capitalizeName(name) {
  let splitNames = name.toLowerCase().split(" ");
  for (let i = 0; i < splitNames.length; i++) {
    splitNames[i] =
      splitNames[i].charAt(0).toUpperCase() +
      splitNames[i].slice(1, splitNames[i].length);
  }
  return splitNames.join(" ");
}

function TestimonialCard({ fullName, star, message, date }) {
  return (
    <div className='flex flex-col select-none bg-white p-4 rounded-lg shadow-[0_1px_16px_rgba(0,0,0,0.4)] my-7 mx-4 max-sm:h-[250px] h-[310px] md:h-[300px] lg:h-[270px]'>
      <h3 className='font-medium text-lg text-start'>
        {capitalizeName(fullName)}
      </h3>
      <div>
        <div className='flex gap-1 sm:py-3 py-1'>
          {[1, 2, 3, 4, 5].map((val) => (
            <FontAwesomeIcon
              key={val}
              icon={val <= star ? faStar : faStarRegular}
              size='lg'
              className={`text-[#FFD700] fa-fw`}
            />
          ))}
        </div>
      </div>
      <p className='grow h-full text-start overflow-hidden'>{message}</p>

      <p className='w-full text-end text-sm text-gray-500'>
        Reviewed on {date}
      </p>
    </div>
  );
}

export default TestimonialCard;
