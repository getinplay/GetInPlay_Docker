import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ConfirmDialog from "../../ConfirmDialog";
import PropTypes from "prop-types";

BookingCard.propTypes = {
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  showCancel: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  refreshPage: PropTypes.func.isRequired,
};

function BookingCard({ date, price, game, slot, showCancel, id, refreshPage }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getAuthToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
  };

  const handleCancelBooking = async () => {
    const token = getAuthToken();

    if (!token) {
      toast.error("Authentication error! Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/Api/slot_cancle.php`,
        {
          token,
          auth: "user",
          book_id: id,
          date,
          slot,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Booking cancelled successfully!", {
          position: "top-right",
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          autoClose: 3000,
        });
        refreshPage();
      } else {
        toast.error(`Failed to cancel booking: ${response.data.message}`, {
          position: "top-right",
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='select-none flex w-full shadow-lg border border-gray-100 bg-white px-2 rounded-md text-start'>
      {showCancel && (
        <div className='flex justify-center items-center gap-1'>
          <button
            className='relative group flex hover:text-red-400 items-center justify-center text-lg text-gray-400 cursor-pointer'
            onClick={() => setIsDialogOpen(true)}>
            <FontAwesomeIcon icon={faTrashCan} />
            <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 whitespace-nowrap'>
              Cancel Booking
            </div>
          </button>
          <div className='bg-gray-300 w-0.25 h-full'></div>
        </div>
      )}

      <div className='w-full flex flex-col gap-1 px-2 py-1'>
        <div className='flex text-lg sm:text-xl justify-between gap-2'>
          <div className='flex flex-col'>
            <p className='font-medium'>{date}</p>
            <p className='text-gray-400 max-sm:text-sm text-base'>
              Booking-ID: #{id}
            </p>
          </div>
          <p className='font-semibold text-gray-500'>₹{price}</p>
        </div>
        <div className='flex max-2xs:flex-col sm:text-lg justify-between 2xs:gap-2'>
          <p className='font-medium tracking-wide'>{game.toUpperCase()}</p>
          <p className=''>{slot}</p>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title='Cancel Booking'
        message={
          <>
            Are you sure you want to cancel your booking for{" "}
            <strong>{game.toUpperCase()}</strong> on <strong>{date}</strong> at{" "}
            <strong>{slot}</strong>?
          </>
        }
        onConfirm={() => {
          setIsDialogOpen(false);
          handleCancelBooking();
        }}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default BookingCard;
