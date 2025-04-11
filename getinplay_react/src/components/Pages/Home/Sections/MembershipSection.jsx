import React from "react";
import MembershipCard from "../Cards/MembershipCard";
import { Link } from "react-router-dom";

function MembershipSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="subtitle">Membership Plans</h2>
      <p className="sm:text-base text-sm">
        Choose the best plan for your game slot bookings.
      </p>
      <div className="flex lg:flex-row flex-col max-sm:w-[90vw] w-[60vw] lg:w-[80vw] gap-4 pt-10 justify-evenly items-center">
        <MembershipCard rate={"0"} popular={false} onlineAccess={true}>
          Basic
        </MembershipCard>
        <MembershipCard rate={"50"} popular={true} onlineAccess={true}>
          Silver
        </MembershipCard>
        <MembershipCard rate={"100"} popular={false} onlineAccess={true}>
          Gold
        </MembershipCard>
      </div>
      <Link
        to={"/membership"}
        viewTransition
        className="sm:text-base text-sm duration-200 active:bg-[#4A5BE6] bg-white active:text-white hover:bg-[#4A5BE6] hover:text-white border-1 border-gray-300 my-3 px-3 py-1 rounded-md cursor-pointer">
        View Plans
      </Link>
    </div>
  );
}

export default MembershipSection;
