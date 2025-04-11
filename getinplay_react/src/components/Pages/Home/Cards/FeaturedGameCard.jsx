import React from "react";
import { Link } from "react-router-dom";

function FeaturedGameCard({ children, src, gameId }) {
  return (
    <div className='flex-1'>
      <Link
        to={`games/${gameId}`}
        className='group select-none hover:shadow-lg shadow-gray-300 shadow-md bg-white flex flex-col cursor-pointer active:scale-[1.08] hover:-translate-y-1 duration-300 w-full h-[300px] xs:h-[300px] sm:h-[325px] lg:h-[270px] rounded-lg overflow-hidden'>
        <div className='w-full h-[90%] overflow-hidden'>
          <img
            src={src}
            alt={children}
            className='object-cover h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110'
          />
        </div>
        <p className='xs:text-2xl text-xl font-extrabold text-gray-800 p-3'>
          {children.toUpperCase()}
        </p>
      </Link>
    </div>
  );
}

export default FeaturedGameCard;
