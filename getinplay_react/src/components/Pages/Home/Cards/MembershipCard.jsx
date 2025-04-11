import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MembershipCard({ children, rate, popular, onlineAccess }) {
  return (
    <>
      <div className="relative active:bg-gray-100 duration-300 hover:bg-gray-50 hover:scale-103 select-none border-gray-300 border-1 w-full rounded-lg sm:gap-2 gap-1 sm:py-5 py-3 flex flex-col justify-center items-center text-start">
        <p className={`sm:px-5 px-3 w-full text-start text-xl sm:text-2xl font-medium`}>
          {children}
        </p>
        <p className={`sm:px-5 px-3 w-full text-start text-lg sm:text-xl sm:pb-5 pb-3`}>
          <span className={`text-3xl sm:text-4xl font-semibold text-black `}>
            ₹{rate}{" "}
          </span>
          /per month
        </p>
        <hr className="text-gray-300 w-full" />
        <div className="sm:px-5 px-3 flex w-full items-center gap-2 justify-start">
          <FontAwesomeIcon icon={faCheckCircle} className="text-[#4A5BE6]" />
          <div className="sm:text-base text-sm">
            Access to all online booking
          </div>
        </div>
        <div className="sm:px-5 px-3 flex w-full items-center gap-2 justify-start">
          <FontAwesomeIcon
            icon={faChevronCircleDown}
            className="text-gray-400"
          />
          <div className="sm:text-base text-sm">View More</div>
        </div>
        {popular ? (
          <div className="sm:text-base text-sm absolute bg-[#4A5BE6] px-3 py-1 rounded-2xl right-2.5 text-white top-[-12px]">
            Popular
          </div>
        ) : null}
      </div>
    </>
  );
}

export default MembershipCard;
