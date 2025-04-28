import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", otp: "" });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateFields() {
    let tempErrors = { email: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email is required!";
      isValid = false;
    } else {
      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = "Please enter a valid email!";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  }

  function validateOtp() {
    let tempErrors = { ...errors, otp: "" };
    let isValid = true;

    if (otp.some((digit) => digit === "")) {
      tempErrors.otp = "Please enter all 6 digits of the OTP";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  }

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric input
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Api/verify_email.php`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
        setShowOtpInput(true);
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();

    if (!validateOtp()) return;

    try {
      const otpValue = otp.join("");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Api/verify_code.php`,
        { code: otpValue },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        toast.success(
          "OTP verified successfully! You can now reset your password.",
          {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
          }
        );
        // Here you would transition to password reset form
        // For now, we'll just reset the form
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
        setShowOtpInput(false);
      } else {
        toast.error(res.data.message || "Invalid OTP. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
  }

  return (
    <>
      <div className='w-full py-10 flex items-stretch justify-center'>
        <form
          onSubmit={showOtpInput ? verifyOtp : handleSubmit}
          noValidate
          className='lg:w-[50%] md:w-[65%] max-md:w-[90%] max-w-[450px] min-h-max sm:p-5 rounded-xl bg-white flex flex-col gap-3 items-center justify-between'>
          <div>
            <p className='text-3xl sm:text-4xl font-bold text-[#4A5BE6] text-center'>
              FORGOT PASSWORD?
            </p>
            <p className='sm:text-lg font-light text-gray-400'>
              {showOtpInput
                ? "Enter the OTP sent to your email"
                : "We'll send you reset instructions"}
            </p>
          </div>

          {!showOtpInput ? (
            <div className='flex flex-col pt-2 items-center justify-center w-full sm:text-lg font-medium text-gray-600'>
              <div className='flex flex-col text-start w-full'>
                <label className='px-2'>Email</label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className='text-gray-600 fa-fw'
                  />
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email Address'
                    className='grow min-w-0 outline-none border-none'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.email}&nbsp;
                </p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col pt-2 items-center justify-center w-full sm:text-lg font-medium text-gray-600'>
              <div className='flex flex-col text-start w-full'>
                <label className='px-2'>6-Digit OTP</label>
                <div className='flex justify-between w-full mt-2'>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type='text'
                      maxLength='1'
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className='xs:w-12 xs:h-12 h-10 w-10 text-center text-xl font-medium rounded-md bg-gray-200 outline-none focus:shadow-md focus:scale-105 duration-300'
                    />
                  ))}
                </div>
                <p className='select-none text-red-500 text-sm px-2 mt-1'>
                  {errors.otp}&nbsp;
                </p>
              </div>
            </div>
          )}

          <button
            type='submit'
            className='select-none mb-5 cursor-pointer bg-[#4A5BE6] p-2 rounded-lg tracking-wide text-white sm:text-lg active:translate-y-2 active:shadow-none duration-300 shadow-gray-400 hover:shadow-xl shadow-lg w-full'>
            {showOtpInput ? "VERIFY OTP" : "RESET PASSWORD"}
          </button>
          <p className='text-gray-500'>
            Remember your password?{" "}
            <Link to={"/login"} className='cursor-pointer text-[#4A5BE6]'>
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
