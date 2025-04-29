import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

FeedBackForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

function FeedBackForm({ closeForm }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const maxMessageLength = 150;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const handleSubmit = async () => {
    if (!token) {
      toast.error("You are not authenticated. Please login again.", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      });
      navigate("/");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating before submitting.", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      return;
    }
    if (message.trim().length === 0) {
      toast.error("Message cannot be empty.", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Api/rating.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            star: rating,
            message,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        closeForm();
        toast.success(data.message, {
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
        setRating(0);
        setMessage("");
      } else {
        toast.error(data.message || "Failed to submit feedback.", {
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    } catch {
      toast.error("An error occurred. Please try again later.", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
    setIsSending(false);
  };

  return (
    <div
      onClick={closeForm}
      className='inset-0 p-6 fixed z-30 flex justify-center items-center bg-gray-200/50 backdrop-blur-sm'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative bg-white w-full sm:w-lg rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.4)] flex flex-col gap-1 sm:text-xl text-lg p-3'>
        <button
          className='top-3 right-3 text-xl cursor-pointer absolute'
          onClick={closeForm}>
          <FontAwesomeIcon icon={faXmark} size='lg' className='fa-fw' />
        </button>
        <h1 className='text-gray-700 sm:text-4xl text-3xl pt-1 sm:pt-3'>
          Rate Us
        </h1>
        <div
          className='flex flex-col max-sm:gap-1 max-sm:p-1 text-gray-600 justify-between
        items-start'>
          <div className='flex gap-1 justify-center sm:py-3 py-1'>
            {[1, 2, 3, 4, 5].map((val) => (
              <FontAwesomeIcon
                key={val}
                icon={val <= rating ? faStar : faStarRegular}
                onClick={() => setRating(val)}
                size='lg'
                className={`cursor-pointer text-[#FFD700] fa-fw`}
              />
            ))}
          </div>
          How was your Experience?
        </div>
        <div className='flex flex-col text-start sm:text-base text-sm w-full'>
          <textarea
            required
            value={message}
            onChange={(e) => {
              const newMessage = e.target.value;
              if (
                newMessage.length <= maxMessageLength &&
                /^[a-zA-Z0-9\s.,?'!]*$/.test(newMessage)
              ) {
                setMessage(newMessage);
              }
            }}
            rows={3}
            id='message'
            name='message'
            placeholder='Enter your Message'
            className='resize-none bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'
          />
          <p className='text-gray-400 text-sm px-2 font-medium'>
            {message.length}/{maxMessageLength}
          </p>
        </div>
        <div className='flex max-sm:flex-col w-full justify-center items-center py-2 text-lg'>
          <button
            type='button'
            disabled={isSending}
            onClick={handleSubmit}
            className={`bg-[#4A5BE6] text-white hover:shadow-xl max-sm:w-full shadow-lg cursor-pointer active:translate-y-2 active:shadow-none font-normal sm:text-lg w-[160px] p-1 rounded-lg tracking-wide shadow-gray-400 duration-300 ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {isSending ? "SENDING..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedBackForm;
