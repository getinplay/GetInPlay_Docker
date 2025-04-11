import { Link } from "react-router-dom";

function ReserveNowSection() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='lg:w-max lg:h-[400px] p-10 flex flex-col-reverse lg:flex-row items-center justify-center'>
          <div className='lg:w-[40svw] w-[80svw] flex flex-col justify-between items-start pl-5 max-lg:rounded-b-xl lg:rounded-l-xl h-full bg-[#4A5BE6] p-5 '>
            <h4 className='text-2xl sm:text-3xl font-bold text-white tracking-wide'>
              Reserve Now!
            </h4>
            <p className='text-white text-start sm:text-lg font-semibold'>
              Secure your spot at the most anticipated events of the year. Don't
              miss out!
            </p>
            <Link
              to='/signup'
              className='hover:bg-gray-200 duration-300 active:translate-y-2 active:shadow-none shadow-lg cursor-pointer text-base sm:text-lg text-[#4A5BE6] bg-white font-semibold rounded-lg px-3 sm:px-5 py-1 sm:py-2'>
              Join for free
            </Link>
          </div>
          <div className='lg:w-[40svw] w-[80svw] lg:rounded-r-xl max-lg:rounded-t-xl h-full overflow-hidden bg-amber-400'>
            <img
              src='assets/images/chess.jpeg'
              alt='Chess'
              className='object-cover h-full w-full'
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ReserveNowSection;
