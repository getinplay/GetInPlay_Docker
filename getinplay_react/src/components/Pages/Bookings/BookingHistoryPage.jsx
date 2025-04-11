import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClose,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import FeedBackForm from "../../FeedBackForm";

function BookingHistoryPage() {
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(0);
    const fetchBookings = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        if (!token) {
          console.error("Auth token not found");
          navigate("/");
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/Api/history_user.php`,
          { token },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
          setBookings({
            upcoming: response.data.upcoming || [],
            past: response.data.past || [],
            cancelled: response.data.deleted || [],
          });
        } else {
          console.error("Failed to fetch booking history");
        }
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchBookings();
  }, [activeTab, refreshPage]);

  // Search filtering function
  const filterBookings = (bookingsList) => {
    if (!searchQuery) return bookingsList;

    const normalizedQuery = searchQuery.toLowerCase().trim();

    return bookingsList.filter((booking) =>
      Object.values(booking).some((value) =>
        String(value).toLowerCase().includes(normalizedQuery)
      )
    );
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  // Apply search filter to current tab's bookings
  const filteredBookings = filterBookings(bookings[activeTab]);

  // Paginate filtered bookings
  const currentBookings = filteredBookings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className='w-full grow py-10'>
      <>
        {isDialogOpen && (
          <FeedBackForm closeForm={() => setIsDialogOpen(false)} />
        )}
      </>
      <div className='flex flex-col justify-center w-full xs:px-15 lg:px-30'>
        <div className='flex items-center duration-300 focus-within:shadow-[0_3px_8px_rgb(150,150,150)] text-gray-500 px-2 mb-5 border bg-gray-100 border-gray-300 rounded-xl'>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type='text'
            placeholder='Search games...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            className='w-full p-2 focus:outline-none'
          />
          {searchQuery && (
            <button className='cursor-pointer' onClick={clearSearch}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          )}
        </div>

        <div className='bg-white flex text-lg sm:text-xl justify-center lg:px-5 px-5 lg:gap-5 gap-2'>
          {[
            { label: "Upcoming", key: "upcoming" },
            { label: "Past", key: "past" },
            { label: "Cancelled", key: "cancelled" },
          ].map(({ label, key }) => (
            <button
              key={key}
              className={`relative flex items-center justify-center gap-0.5 cursor-pointer 2xs:w-[33.3%] py-1 rounded-t-lg border-b-3 duration-300 ${
                activeTab === key
                  ? "font-semibold text-blue-700"
                  : "text-gray-400 border-transparent"
              }`}
              onClick={() => {
                setActiveTab(key);
                setCurrentPage(0);
                setSearchQuery(""); // Clear search when changing tabs
              }}>
              {label}

              {activeTab === key && (
                <span
                  className={`text-white text-xs font-normal aspect-square px-2 w-5 flex justify-center items-center rounded-full ${
                    activeTab === key ? "bg-blue-700" : "bg-gray-400"
                  }`}>
                  {filteredBookings.length || 0}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className='h-max grow lg:px-5 px-2 py-5 rounded-lg lg:gap-5 gap-2 justify-center w-full items-stretch grid grid-cols-1 md:grid-cols-2'>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                date={booking.book_date}
                price={booking.price}
                game={booking.name}
                slot={booking.slot}
                showCancel={activeTab === "upcoming"}
                id={booking.id.toString()}
                refreshPage={() => setRefreshPage((prev) => !prev)}
              />
            ))
          ) : (
            <div className='text-gray-500 italic text-lg font-medium text-center col-span-2 py-5'>
              {searchQuery
                ? "No bookings match your search query."
                : activeTab === "upcoming"
                ? "No upcoming game bookings. Book a slot now!"
                : activeTab === "past"
                ? "No past game bookings. Start playing and check your history here!"
                : "No cancelled bookings."}
            </div>
          )}
        </div>

        {filteredBookings.length > itemsPerPage && (
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredBookings.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center space-x-2 mt-5"}
            forcePage={currentPage}
            pageClassName={
              "select-none px-1 sm:px-3 py-0.5 sm:py-1 bg-gray-200 rounded cursor-pointer list-none"
            }
            activeClassName={"select-none bg-blue-600 text-blue-700 font-bold"}
            previousClassName={
              "select-none px-1 sm:px-3 py-0.5 sm:py-1 bg-gray-300 rounded cursor-pointer list-none"
            }
            nextClassName={
              "select-none px-1 sm:px-3 py-0.5 sm:py-1 bg-gray-300 rounded cursor-pointer list-none"
            }
            disabledClassName={"select-none opacity-40 !cursor-not-allowed"}
            pageLinkClassName={"select-none block px-1 sm:px-3 py-0.5 sm:py-1"}
            previousLinkClassName={
              "select-none block px-1 sm:px-3 py-0.5 sm:py-1"
            }
            nextLinkClassName={"select-none block px-1 sm:px-3 py-0.5 sm:py-1"}
            breakLabel={"..."}
            breakClassName={"select-none list-none"}
            pageRangeDisplayed={0}
            marginPagesDisplayed={1}
          />
        )}

        {activeTab === "past" && (
          <div className='w-full flex justify-center py-5'>
            <button
              onClick={() => setIsDialogOpen(true)}
              className='bg-[#4A5BE6] cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors'>
              <FontAwesomeIcon icon={faStar} />
              Rate Us
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistoryPage;
