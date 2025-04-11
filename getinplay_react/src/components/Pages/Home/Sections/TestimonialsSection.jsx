import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TestimonialCard from "../Cards/TestimonialCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretRight,
  faSquareCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/Api/fatch_rating.php`
        );
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className='flex flex-col items-center w-full p-5 mx-auto'>
      <h2 className='subtitle text-center '>Our Happy Customers</h2>
      <p className='sm:text-base text-sm mb-4'>
        Word of praise by our valuable customers
      </p>

      <div className='w-[90vw] md:w-[80vw] lg:w-[80vw] h-full relative'>
        {testimonials.length > 0 ? (
          <>
            <button
              type='button'
              className='absolute top-1/2 -translate-y-1/2 left-0 md:-left-10 flex items-center justify-center cursor-pointer hover:text-gray-200 duration-200 text-gray-500 z-20 custom-prev'>
              <FontAwesomeIcon size='2xl' icon={faSquareCaretLeft} />
            </button>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              // pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                600: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className='py-5'>
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard
                    fullName={testimonial.full_name}
                    star={testimonial.star}
                    message={testimonial.message}
                    date={testimonial.date}
                  />
                </SwiperSlide>
              ))}{" "}
            </Swiper>
            <button
              type='button'
              className='absolute top-1/2 -translate-y-1/2 right-0 md:-right-10 flex items-center justify-center cursor-pointer hover:text-gray-200 duration-200 text-gray-500 z-20 custom-next'>
              <FontAwesomeIcon size='2xl' icon={faSquareCaretRight} />
            </button>
          </>
        ) : (
          <p className='text-center'>No testimonials available.</p>
        )}
      </div>
    </div>
  );
}

export default TestimonialsSection;
