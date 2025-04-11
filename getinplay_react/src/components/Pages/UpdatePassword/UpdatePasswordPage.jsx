import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UpdatePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => password.length >= 8;

  const validateForm = () => {
    const newErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (/\s/.test(newPassword)) {
      newErrors.newPassword = "Password cannot contain whitespace";
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) {
        toast.error("You are not authenticated. Please login again.", {
          pauseOnHover: false,
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
        navigate("/");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Api/change_password.php`,
        {
          token,
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully!", {
          pauseOnHover: false,
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
      } else {
        toast.error(response.data.message || "Failed to update password.", {
          pauseOnHover: false,
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.", {
        pauseOnHover: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      toast.error("You are not authenticated. Please login again.", {
        pauseOnHover: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
      navigate("/");
    }
    return;
  }, []);

  return (
    <div className='sm:w-lg max-sm:max-w-max w-full mt-5 rounded-lg p-4'>
      <h1 className='text-2xl sm:text-3xl font-semibold text-gray-700 pb-3 text-center'>
        Update Your Password
      </h1>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1 items-center justify-center shadow-[0_2px_16px_rgba(0,0,0,0.4)] rounded-lg p-5 w-full sm:text-lg font-medium text-gray-600'>
          <div className='flex flex-col text-start w-full'>
            <label
              htmlFor='old-password'
              className='text-gray-700 font-semibold required px-2'>
              Old Password
            </label>
            <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
              <input
                type={showOldPassword ? "text" : "password"}
                name='old-password'
                id='old-password'
                placeholder='Old Password'
                className='grow min-w-0 outline-none border-none bg-transparent'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
                onClick={() => setShowOldPassword(!showOldPassword)}
                className='text-gray-500 focus:outline-none cursor-pointer'>
                <FontAwesomeIcon
                  className='fa-fw'
                  icon={showOldPassword ? faEyeSlash : faEye}
                  size='sm'
                />
              </div>
            </div>
            <p className='select-none text-red-500 text-sm px-2'>
              {errors.oldPassword || "\u00A0"}
            </p>
          </div>

          <div className='flex flex-col text-start w-full'>
            <label
              htmlFor='new-password'
              className='text-gray-700 font-semibold required px-2'>
              New Password
            </label>
            <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
              <input
                type={showNewPassword ? "text" : "password"}
                name='new-password'
                id='new-password'
                placeholder='New Password'
                className='grow min-w-0 outline-none border-none bg-transparent'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                onClick={() => setShowNewPassword(!showNewPassword)}
                className='text-gray-500 focus:outline-none cursor-pointer'>
                <FontAwesomeIcon
                  className='fa-fw'
                  icon={showNewPassword ? faEyeSlash : faEye}
                  size='sm'
                />
              </div>
            </div>
            <p className='select-none text-red-500 text-sm px-2'>
              {errors.newPassword || "\u00A0"}
            </p>
          </div>

          <div className='flex flex-col text-start w-full'>
            <label
              htmlFor='confirm-password'
              className='text-gray-700 font-semibold required px-2'>
              Confirm Password
            </label>
            <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirm-password'
                id='confirm-password'
                placeholder='Confirm Password'
                className='grow min-w-0 outline-none border-none bg-transparent'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='text-gray-500 focus:outline-none cursor-pointer'>
                <FontAwesomeIcon
                  className='fa-fw'
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  size='sm'
                />
              </div>
            </div>
            <p className='select-none text-red-500 text-sm px-2'>
              {errors.confirmPassword || "\u00A0"}
            </p>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`select-none mt-2 bg-[#4A5BE6] p-3 py-1 rounded-lg tracking-wide font-normal text-white sm:text-lg active:translate-y-2 active:shadow-none duration-300 shadow-gray-400 w-full sm:w-[210px] ${
              loading
                ? "bg-gray-500 text-gray-200 translate-y-2 shadow-none"
                : "hover:shadow-xl shadow-lg cursor-pointer"
            }`}>
            {loading ? "UPDATING..." : "UPDATE PASSWORD"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordPage;
