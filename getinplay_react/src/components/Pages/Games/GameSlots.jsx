import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimeSlotCard from "../Home/Cards/TimeSlotCard";
import ButtonGroupBtn from "./ButtonGroupBtn";
import DatePicker from "./DatePicker";
import axios from "axios";
import ConfirmLogin from "../../ConfirmLogin";
import BookGamePopup from "./BookGamePopup";
import FeedBackForm from "../../FeedBackForm";

function GameSlots() {
  const [isLogin, setIsLogin] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshPage, setRefreshPage] = useState(false);
  const { id } = useParams();
  const [currentGame, setCurrentGame] = useState({
    name: "",
  });
  const [originalSlots, setOriginalSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [terms, setTerms] = useState("");
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const filterOptions = ["30min", "1hr"];
  const filterOptionsDay = ["All", "Morning", "Afternoon", "Evening", "Night"];
  const [selectedDayFilter, setSelectedDayFilter] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showFeedBackForm, setShowFeedBackForm] = useState(false);

  // Helper function to parse time from slot format (e.g., 10:30-11:00AM)
  const parseTime = (timeSlot) => {
    // Extract the start time and determine AM/PM
    const match = timeSlot.match(/(\d+:\d+)-\d+:\d+([AP]M)/);
    if (!match) return null;

    const [, time, period] = match;
    const [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    let convertedHours = hours;
    if (period === "PM" && hours !== 12) {
      convertedHours += 12;
    } else if (period === "AM" && hours === 12) {
      convertedHours = 0;
    }

    return convertedHours;
  };

  // Function to assign day filter based on time
  const assignDayFilter = (timeSlot) => {
    const hours = parseTime(timeSlot);

    if (hours === null) return "Unknown";

    if (hours >= 5 && hours < 12) return "Morning";
    if (hours >= 12 && hours < 17) return "Afternoon";
    if (hours >= 17 && hours < 20) return "Evening";
    return "Night"; // 20:00 to 4:59
  };

  // Function to filter slots by duration and time of day
  const filterSlots = (timeSlots, durationOption, dayOption) => {
    return timeSlots.filter((slot) => {
      const durationMatch =
        durationOption === "All" || slot.filter === durationOption;
      const dayMatch = dayOption === "All" || slot.dayFilter === dayOption;
      return durationMatch && dayMatch;
    });
  };
  const fetchAllSlots = async () => {
    let bookedSlots;
    let allSlots;
    let filter;
    const date = selectedDate.toJSON().slice(0, 10).replace(/-/g, "/");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/Api/filter_time.php`,
      { id: id, date: date },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    allSlots = res.data.slots;
    filter = res.data.filter;

    const res2 = await axios.post(
      `${import.meta.env.VITE_API_URL}/Api/book_slots.php`,
      { game_id: id, date: date },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    bookedSlots = res2.data.booked_slots.map((slot) => slot.slot);
    let tempTimeSlots = [];
    allSlots.forEach((slot, index) => {
      if (bookedSlots.includes(slot)) {
        tempTimeSlots.push({
          time: slot,
          isBooked: true,
          filter: filter[index],
          dayFilter: assignDayFilter(slot),
        });
      } else {
        tempTimeSlots.push({
          time: slot,
          isBooked: false,
          filter: filter[index],
          dayFilter: assignDayFilter(slot),
        });
      }
    });
    setOriginalSlots(tempTimeSlots);
    setTimeSlots(
      filterSlots(
        tempTimeSlots,
        filterOptions[selected],
        filterOptionsDay[selectedDayFilter]
      )
    );
  };
  useEffect(() => {
    const fetchTerms = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/Api/term_condition.php`
      );
      setTerms(res.data);
    };

    const checkLogin = async () => {
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
      setIsLogin(res.data.success);
    };
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/Api/game_data.php`
      );
      setCurrentGame(res.data.find((ele) => ele.id == id));
    };

    fetchData();
    fetchAllSlots();
    fetchTerms();
    if (document.cookie) {
      checkLogin();
    }
  }, [selectedDate, refreshPage, selected, selectedDayFilter]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAllSlots();
    }, 5000);

    return () => clearInterval(intervalId); // clean up on unmount
  }, [selectedDate, selected, selectedDayFilter]);

  return (
    <div className='w-full xs:w-[90vw] md:w-[80vw] p-2 xs:p-5 flex flex-col gap-5'>
      {showFeedBackForm && (
        <FeedBackForm closeForm={() => setShowFeedBackForm(false)} />
      )}
      <h2 className='text-3xl p-3 sm:text-4xl font-extrabold text-gray-700'>
        {currentGame.name.toUpperCase()}
      </h2>
      <img
        className='shadow-[0_2px_16px_rgba(0,0,0,0.3)] h-[30vh] sm:h-[50vh] min-h-[200px] object-cover rounded-lg'
        src={`${import.meta.env.VITE_API_URL}/admin/${currentGame.slot_image}`}
        alt={`image`}
      />
      <div className='flex w-full flex-col lg:flex-row gap-5 justify-between max-lg:items-start items-center'>
        <div>
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className='flex gap-3 w-full justify-end max-sm:flex-col'>
          <div className='flex w-max bg-gray-200 rounded-full duration-300'>
            {filterOptionsDay.map((ele, index) => (
              <ButtonGroupBtn
                onClickHandler={() => {
                  setTimeSlots(
                    filterSlots(originalSlots, filterOptions[selected], ele)
                  );
                  setSelectedDayFilter(index);
                }}
                index={index}
                key={index}
                isSelected={index === selectedDayFilter}>
                {ele}
              </ButtonGroupBtn>
            ))}
          </div>
          <div className='flex w-max bg-gray-200 rounded-full duration-300'>
            {filterOptions.map((ele, index) => (
              <ButtonGroupBtn
                onClickHandler={() => {
                  setTimeSlots(
                    filterSlots(
                      originalSlots,
                      ele,
                      filterOptionsDay[selectedDayFilter]
                    )
                  );
                  setSelected(index);
                }}
                index={index}
                key={index}
                isSelected={index === selected}>
                {ele}
              </ButtonGroupBtn>
            ))}
          </div>
        </div>
      </div>
      {timeSlots.length > 0 ? (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-evenly'>
            {timeSlots.map((slot, index) => (
              <TimeSlotCard
                key={index}
                onClick={
                  slot.isBooked
                    ? () => {}
                    : async () => {
                        if (isLogin) {
                          setShowBookingConfirm(true);
                          setSelectedSlot(slot);
                        } else {
                          ConfirmLogin();
                        }
                      }
                }
                isBooked={slot.isBooked}>
                {slot.time}
              </TimeSlotCard>
            ))}
          </div>
          {showBookingConfirm && (
            <BookGamePopup
              terms={terms}
              setAgree={setAgree}
              agree={agree}
              slotTime={selectedSlot.time}
              gameId={id}
              gameName={currentGame.name}
              selectedDate={selectedDate}
              setShowFeedBackForm={setShowFeedBackForm}
              setRefreshPage={setRefreshPage}
              showTerms={showBookingConfirm}
              price={
                selectedSlot.filter == "30min"
                  ? currentGame.half_hour
                  : currentGame.hour
              }
              hideBooking={() => setShowBookingConfirm(false)}
            />
          )}
        </>
      ) : (
        <p className='text-gray-700 italic text-lg'>
          No Slots Available for this Game
        </p>
      )}
    </div>
  );
}

export default GameSlots;
