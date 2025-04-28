import React, { useEffect, useState } from "react";
import MembershipFullCard from "./MembershipFullCard";
import axios from "axios";
import ConfirmLogin from "../../ConfirmLogin";
import ConfirmDialog from "../../ConfirmDialog";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function MembershipPage() {
  const [currentPlan, setCurrentPlan] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const membershipPlans = [
    {
      id: 1,
      name: "Basic",
      allSlotBooking: true,
      cancellation: 4,
      bookBefore: 24,
      extendSlot: true,
      stickAllowed: false,
      personAllowedPerTable: 4,
      amount: 0,
      popular: false,
    },
    {
      id: 2,
      name: "Silver",
      allSlotBooking: true,
      cancellation: 3,
      bookBefore: 48,
      extendSlot: true,
      stickAllowed: true,
      personAllowedPerTable: 5,
      amount: 50,
      popular: true,
    },
    {
      id: 3,
      name: "Gold",
      allSlotBooking: true,
      cancellation: 2,
      bookBefore: 72,
      extendSlot: true,
      stickAllowed: true,
      personAllowedPerTable: 6,
      amount: 100,
      popular: false,
    },
  ];

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
    setCurrentPlan(res.data.data.membership_id);
  };

  const handleUpgradeClick = (planId) => {
    if (
      !document.cookie.split("; ").find((row) => row.startsWith("authToken="))
    ) {
      ConfirmLogin();
      return;
    }
    setSelectedPlan(planId);
    setShowConfirmModal(true);
  };

  const upgradePlan = async () => {
    setShowConfirmModal(false);
    if (!selectedPlan) return;
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/Api/update_membership.php`,
      {
        token: document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1],
        membership_id: selectedPlan,
      }
    );
    if (res.data.success) {
      setCurrentPlan(selectedPlan);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <div className='flex grow h-full w-full flex-col gap-2 items-center p-5'>
      <h1 className='text-gray-700 sm:text-5xl text-4xl font-bold p-3'>
        Compare our plans and find yours
      </h1>
      <p className='sm:text-lg font-[400] text-gray-400'>
        We offer exciting plans that make you play hustle-free and enjoy the
        time.
      </p>
      <div className='py-5 w-full grow justify-center items-center md:items-stretch max-md:flex-col flex gap-5 overflow-x-auto'>
        {membershipPlans.map((plan) => (
          <MembershipFullCard
            key={plan.id}
            {...plan}
            features={
              <>
                <p
                  className={`${
                    currentPlan < plan.id ? "group-hover:text-white" : ""
                  }`}>
                  <span
                    className={`${
                      currentPlan === plan.id
                        ? "text-green-700"
                        : !(currentPlan > plan.id)
                        ? "group-hover:text-white text-[#4A5BE6]"
                        : "text-gray-500"
                    }`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>{" "}
                  30min - 1hr Booking
                </p>
                <p
                  className={`${
                    currentPlan < plan.id ? "group-hover:text-white" : ""
                  }`}>
                  <span
                    className={`${
                      currentPlan === plan.id
                        ? "text-green-700"
                        : !(currentPlan > plan.id)
                        ? "group-hover:text-white text-[#4A5BE6]"
                        : "text-gray-500"
                    }`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>{" "}
                  Cancellation {plan.cancellation}hrs before game
                </p>
                <p
                  className={`${
                    currentPlan < plan.id ? "group-hover:text-white" : ""
                  }`}>
                  <span
                    className={`${
                      currentPlan === plan.id
                        ? "text-green-700"
                        : !(currentPlan > plan.id)
                        ? "group-hover:text-white text-[#4A5BE6]"
                        : "text-gray-500"
                    }`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>{" "}
                  Book before {plan.bookBefore}hrs
                </p>
                <p
                  className={`${
                    currentPlan < plan.id ? "group-hover:text-white" : ""
                  }`}>
                  <span
                    className={`${
                      currentPlan === plan.id
                        ? "text-green-700"
                        : !(currentPlan > plan.id)
                        ? "group-hover:text-white text-[#4A5BE6]"
                        : "text-gray-500"
                    }`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>{" "}
                  Extend slot if free
                </p>
                {/* <p>
                  <span
                    className={`${
                      currentPlan === plan.id
                        ? "text-green-700"
                        : !(currentPlan > plan.id)
                        ? "group-hover:text-white text-[#4A5BE6]"
                        : "text-gray-500"
                    }`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>{" "}
                  Upto {plan.personAllowedPerTable} person on single table
                </p> */}
                {/* {plan.name == "Gold" ? <p>TEST</p> : ""} */}
              </>
            }
            isPlanActive={currentPlan > plan.id}
            isCurrentPlan={currentPlan === plan.id}
            onClick={() => handleUpgradeClick(plan.id)}>
            {plan.name}
          </MembershipFullCard>
        ))}
      </div>
      <ConfirmDialog
        isOpen={showConfirmModal}
        title='Confirm Upgrade'
        message={<p>Are you sure you want to upgrade your membership?</p>}
        onConfirm={upgradePlan}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}

export default MembershipPage;
