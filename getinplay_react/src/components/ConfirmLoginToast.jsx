import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ConfirmLoginToast({ closeToast }) {
  const navigate = useNavigate();

  return (
    <div className='flex-col gap-2 items-center text-start'>
      <p className='px-2'>Please login before you continue!</p>
      <button
        onClick={() => {
          navigate("/login");
          closeToast();
        }}
        className='flex gap-2 items-center justify-center font-semibold cursor-pointer bg-[#4A5BE6] m-2 text-white px-3 py-[1px] rounded-lg'>
        <FontAwesomeIcon icon={faRightToBracket} />
        Login
      </button>
    </div>
  );
}

ConfirmLoginToast.propTypes = {
  closeToast: PropTypes.func.isRequired,
};

export default ConfirmLoginToast;
