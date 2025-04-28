import React, { useEffect, useState } from "react";
import axios from "axios";

function DatePicker({ selectedDate, setSelectedDate }) {
  const [currentPlan, setCurrentPlan] = useState(0);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const getWeekday = (date) =>
    date.toLocaleDateString("en-US", { weekday: "short" });
  const getDay = (date) => date.getDate();
  const getMonth = (date) =>
    date.toLocaleDateString("en-US", { month: "short" });

  const fetchPlan = async () => {
    if (
      !document.cookie.split("; ").find((row) => row.startsWith("authToken="))
    ) {
      return;
    }
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/Api/decode.php`,
      {
        token: document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCurrentPlan(res.data.data.membership_id); // Set the membership_id
  };

  useEffect(() => {
    fetchPlan(); // Call the fetchPlan function on component mount
  }, []);
  // Filter the dates based on the currentPlan
  let dates = [today];
  if (currentPlan === 2) {
    dates = [today, tomorrow];
  } else if (currentPlan === 3 || currentPlan === 0) {
    dates = [today, tomorrow, dayAfterTomorrow];
  }

  return (
    <div className='w-max select-none flex bg-gray-200 rounded-lg'>
      {dates.map((date, index) => (
        <button
          key={index}
          onClick={() => setSelectedDate(date)}
          className={`px-3 rounded-lg cursor-pointer ${
            selectedDate.toDateString() === date.toDateString()
              ? "bg-[#4A5BE6] text-white shadow-[2px_2px_5px_rgb(150,150,150)]"
              : "text-gray-900"
          } flex flex-col items-center justify-center`}>
          <span
            className={`text-xs sm:text-sm font-semibold ${
              selectedDate.toDateString() === date.toDateString()
                ? "text-blue-100"
                : "text-gray-500"
            }`}>
            {getWeekday(date)}
          </span>
          <span className='text-lg sm:text-xl font-semibold'>
            {getDay(date)}
          </span>
          <span
            className={`text-xs sm:text-sm font-semibold ${
              selectedDate.toDateString() === date.toDateString()
                ? "text-blue-100"
                : "text-gray-500"
            }`}>
            {getMonth(date)}
          </span>
        </button>
      ))}
    </div>
  );
}

export default DatePicker;
