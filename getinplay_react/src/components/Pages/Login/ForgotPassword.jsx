import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    let errorMessage = "";

    if (!email) {
      errorMessage = "Email cannot be empty!";
    } else if (!emailRegex.test(email)) {
      errorMessage = "Please enter a valid email!";
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        toastId: errorMessage, // Prevents duplicate toasts
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Api/forgot_password.php`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        toast.success("Password reset instructions sent to your email!", {
          toastId: "password-reset",
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      } else {
        toast.error(res.data.message, {
          toastId: "reset-error",
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        toastId: "network-error",
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
  };

  return (
    <div className='w-full duration-500 h-[100vh] py-10 flex items-center justify-center'>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='lg:w-[50%] md:w-[65%] duration-500 max-md:w-[90%] max-w-[500px] min-h-max py-5 shadow-[0_2px_16px_rgba(0,0,0,0.4)] rounded-xl bg-white flex flex-col gap-3 items-center justify-between'>
        <div>
          <p className='text-4xl font-bold text-[#4A5BE6] text-center'>
            FORGOT PASSWORD?
          </p>
          <p className='text-lg font-medium text-gray-400'>
            We'll send you reset instructions.
          </p>
        </div>
        <div className='pt-2 text-xl font-medium flex flex-col items-center justify-center w-full gap-3 '>
          <div className='text-gray-600 flex items-center rounded-xl gap-2 focus-within:shadow-md focus-within:scale-[1.02] duration-300 px-4 py-2 m-2 bg-gray-200 w-5/6'>
            <FontAwesomeIcon icon={faEnvelope} size='lg' />
            <input
              required
              type='email'
              name='email-id'
              id='email-id'
              placeholder='Email-Id'
              value={email}
              className='grow outline-none border-none'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button
          type='submit'
          className='cursor-pointer mb-5 bg-[#4A5BE6] p-2 rounded-lg tracking-wide text-white font-bold text-xl active:translate-y-2 active:shadow-none duration-300 shadow-gray-400 hover:shadow-xl shadow-lg w-5/6'>
          RESET PASSWORD
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
