import React from "react";

function MembershipFullCard({
  amount,
  popular,
  onClick,
  isPlanActive,
  isCurrentPlan,
  children,
  features,
}) {
  return (
    <div
      className={`group select-none xs:max-w-[350px] max-w-[300px] flex flex-col gap-1 bg-white rounded-xl border-1 border-gray-300 relative overflow-hidden ${
        !isPlanActive && !isCurrentPlan ? "hover:animate-gradient" : ""
      }
      `}>
      {!isPlanActive && !isCurrentPlan && (
        <div className='absolute inset-0 bg-gradient-to-tr from-indigo-500 via-violet-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      )}

      <div
        className={`relative p-5 sm:py-8 flex flex-col gap-1 rounded-xl items-start z-10
          ${
            isPlanActive || isCurrentPlan
              ? "text-gray-600"
              : "group-hover:text-white"
          }
        `}>
        <p className='text-xl sm:text-2xl font-medium transition-all duration-300'>
          {children}
        </p>
        <p
          className={`text-lg sm:text-xl transition-all duration-300
            ${
              !isPlanActive && !isCurrentPlan ? "group-hover:text-gray-100" : ""
            }
          `}>
          <span
            className={`text-3xl sm:text-4xl font-semibold text-black transition-all duration-300
              ${!isPlanActive && !isCurrentPlan ? "group-hover:text-white" : ""}
            `}>
            ₹{amount}{" "}
          </span>
          /per month
        </p>
        {popular && (
          <div
            className={`absolute top-5 right-5 rounded-full px-2 py-1 text-white transition-all duration-300
              ${
                isCurrentPlan
                  ? "bg-green-700"
                  : isPlanActive
                  ? "bg-gray-500 text-gray-200"
                  : "bg-[#4A5BE6] group-hover:bg-white/80 group-hover:text-[#4A5BE6]"
              }
            `}>
            Popular
          </div>
        )}
      </div>
      <hr className='z-30 text-gray-300' />
      <div
        className={`
          p-5 
          grow flex flex-col rounded-xl gap-3 sm:gap-4 text-start z-10 duration-300 
          ${isPlanActive ? "text-gray-400" : ""}
        `}>
        {features}
      </div>
      <div className='p-4 z-10'>
        <button
          onClick={isPlanActive || isCurrentPlan ? () => {} : onClick}
          className={`sm:text-lg text-white rounded-xl p-1 w-full duration-300 ${
            isCurrentPlan
              ? "bg-green-700"
              : isPlanActive
              ? "opacity-0"
              : " bg-[#4A5BE6] cursor-pointer group-hover:bg-white/40 hover:bg-white/60   hover:text-"
          }`}>
          {isCurrentPlan ? "Active Plan" : isPlanActive ? "Active" : "Upgrade"}
        </button>
      </div>
    </div>
  );
}

export default MembershipFullCard;
