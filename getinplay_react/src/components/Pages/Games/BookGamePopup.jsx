import React, { useRef, useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import ConfirmDialog from "../../ConfirmDialog";

function BookGamePopup({
  terms,
  hideBooking,
  agree,
  setAgree,
  slotTime,
  gameId,
  gameName,
  selectedDate,
  setRefreshPage,
  setShowFeedBackForm,
  showTerms,
  price,
}) {
  const bookingRef = useRef();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (showTerms) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showTerms]);

  const hideBookingPage = (e) => {
    if (bookingRef.current && !bookingRef.current.contains(e.target)) {
      setAgree(false);
      hideBooking();
    }
  };

  const bookSlot = async (slot, game_id) => {
    const data = {
      token: document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1],
      date: selectedDate.toISOString().split("T")[0].replace(/-/g, "/"),
      slot: slot,
      game_id: game_id,
      price,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/Api/book_game.php`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const confirmBooking = async () => {
    if (!agree) return;
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    hideBooking();

    try {
      await toast.promise(
        new Promise(async (resolve, reject) => {
          const res = await bookSlot(slotTime, gameId);
          if (res.success) {
            setShowFeedBackForm(true);
            resolve(res.message);
          } else {
            reject(new Error(res.message));
          }
        }),
        {
          pending: "Booking in progress...",
          success: {
            render({ data }) {
              return data;
            },
          },
          error: {
            render({ data }) {
              return data.message || "Booking failed. Please try again.";
            },
          },
        },
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          theme: "light",
          transition: Bounce,
        }
      );
    } catch (error) {
      console.error("Booking failed:", error);
    }
    setRefreshPage((prev) => !prev);
  };

  return (
    <div
      onClick={hideBookingPage}
      className='flex items-center justify-center inset-0 fixed bg-gray-200/50 backdrop-blur-xs z-30'>
      <div
        ref={bookingRef}
        className='flex flex-col items-center gap-2 max-w-[85vw] sm:max-w-150 sm:w-[80vw] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.3)] overflow-hidden rounded-xl p-5'>
        <p className='font-bold text-lg text-gray-700'>TERMS & CONDITIONS</p>

        <div className='bg-gray-100 overflow-hidden rounded-lg'>
          <p
            dangerouslySetInnerHTML={{ __html: terms }}
            className='p-2 pl-6 overflow-y-auto max-h-50 text-sm sm:text-base xs:text-justify text-gray-600'></p>
        </div>

        <p className='flex items-center w-full gap-2'>
          <input
            checked={agree}
            onChange={() => setAgree((prev) => !prev)}
            type='checkbox'
            name='terms'
            id='terms'
          />
          <label htmlFor='terms'>I agree to the Terms & Conditions</label>
        </p>

        <button
          onClick={confirmBooking}
          className={`${
            agree
              ? "bg-[#4A5BE6] cursor-pointer active:translate-y-1 active:bg-gray-300"
              : "bg-gray-300"
          } duration-300 text-white rounded-lg font-medium text-lg px-3`}>
          Continue Booking
        </button>
      </div>

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmModal}
        title='Confirm Booking'
        message={
          <>
            Are you sure you want to book <b>{slotTime}</b> slot for{" "}
            <b>{gameName}</b> on
            <b>
              {" "}
              {selectedDate.toISOString().split("T")[0].replace(/-/g, "/")}
            </b>{" "}
            for <b>₹{price}</b>?
          </>
        }
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirmModal(false);
          hideBooking();
        }}
      />
    </div>
  );
}

export default BookGamePopup;
