import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    username: "",
    password: "",
    confirm_pass: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone_no: "",
    username: "",
    password: "",
    confirm_pass: "",
    gender: "",
  });
  const navigate = useNavigate();

  function validateFields() {
    let tempErrors = { ...errors };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required!";
      isValid = false;
    } else if (/\s{2,}/.test(formData.name)) {
      tempErrors.name = "No multiple whitespaces allowed!";
      isValid = false;
    } else {
      tempErrors.name = "";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required!";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format!";
      isValid = false;
    } else {
      tempErrors.email = "";
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone_no.trim()) {
      tempErrors.phone_no = "Phone number is required!";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone_no)) {
      tempErrors.phone_no = "Invalid phone number (10 digits)!";
      isValid = false;
    } else {
      tempErrors.phone_no = "";
    }

    // Username validation
    if (!formData.username.trim()) {
      tempErrors.username = "Username is required!";
      isValid = false;
    } else {
      tempErrors.username = "";
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = "Password is required!";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters!";
      isValid = false;
    } else if (/\s/.test(formData.password)) {
      tempErrors.password = "Password cannot contain whitespaces!";
      isValid = false;
    } else {
      tempErrors.password = "";
    }

    // Confirm password validation
    if (!formData.confirm_pass) {
      tempErrors.confirm_pass = "Please confirm your password!";
      isValid = false;
    } else if (formData.password !== formData.confirm_pass) {
      tempErrors.confirm_pass = "Passwords do not match!";
      isValid = false;
    } else {
      tempErrors.confirm_pass = "";
    }

    // Gender validation
    if (!formData.gender) {
      tempErrors.gender = "Please select a gender!";
      isValid = false;
    } else {
      tempErrors.gender = "";
    }

    setErrors(tempErrors);
    return isValid;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Api/register.php`,
        {
          name: formData.name,
          email: formData.email,
          phone_no: formData.phone_no,
          username: formData.username,
          password: formData.password,
          gender: formData.gender,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsLoading(false);
      if (res.data.success) {
        document.cookie = `authToken=${res.data.token}; path=/;`;
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
        await new Promise((r) => setTimeout(r, 2000));
        navigate("/");
        navigate(0);
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

  return (
    <>
      <div className='w-full py-10 flex items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          noValidate
          className='w-max min-h-max sm:p-5 rounded-xl bg-white flex flex-col gap-3 items-center justify-between'>
          <div>
            <p className='text-3xl sm:text-4xl font-bold text-[#4A5BE6] text-center'>
              REGISTER NOW
            </p>
            <p className='sm:text-lg font-light text-gray-400'>
              Create a new account
            </p>
          </div>
          <div className='flex max-sm:flex-col sm:gap-3'>
            <div className='flex flex-col  items-center justify-center w-full sm:text-lg font-medium text-gray-600'>
              <div className='flex flex-col text-start w-full'>
                <label className='px-2 required'>Name</label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name'
                    value={formData.name}
                    className='grow min-w-0 outline-none border-none'
                    onChange={handleChange}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.name}&nbsp;
                </p>
              </div>

              <div className='flex flex-col text-start w-full'>
                <label className='px-2 required'>Username</label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Username'
                    value={formData.username}
                    className='grow min-w-0 outline-none border-none'
                    onChange={handleChange}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.username}&nbsp;
                </p>
              </div>

              <div className='flex flex-col text-start w-full'>
                <label className='px-2 required'>Phone Number</label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <input
                    type='text'
                    name='phone_no'
                    id='phone_no'
                    placeholder='Phone Number'
                    value={formData.phone_no}
                    className='grow min-w-0 outline-none border-none'
                    onChange={handleChange}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.phone_no}&nbsp;
                </p>
              </div>
            </div>
            <div className='flex flex-col  items-center justify-center w-full sm:text-lg font-medium text-gray-600'>
              <div className='flex flex-col text-start w-full'>
                <label className='px-2 required'>Email</label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Email-Id'
                    value={formData.email}
                    className='grow min-w-0 outline-none border-none'
                    onChange={handleChange}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.email}&nbsp;
                </p>
              </div>
              <div className='flex flex-col text-start w-full'>
                <label htmlFor='password' className='px-2 required'>
                  Password
                </label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <input
                    type={showPass ? "text" : "password"}
                    name='password'
                    id='password'
                    placeholder='Password'
                    value={formData.password}
                    className='grow min-w-0 outline-none border-none'
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={showPass ? faEyeSlash : faEye}
                    size='sm'
                    className='cursor-pointer text-gray-600 fa-fw'
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.password}&nbsp;
                </p>
              </div>

              <div className='flex flex-col text-start w-full'>
                <label htmlFor='confirm_pass' className='px-2 required'>
                  Confirm Password
                </label>
                <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                  <input
                    type={showConPass ? "text" : "password"}
                    name='confirm_pass'
                    id='confirm_pass'
                    placeholder='Confirm Password'
                    value={formData.confirm_pass}
                    className='grow min-w-0 outline-none border-none'
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={showConPass ? faEyeSlash : faEye}
                    size='sm'
                    className='cursor-pointer text-gray-600 fa-fw'
                    onClick={() => setShowConPass(!showConPass)}
                  />
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.confirm_pass}&nbsp;
                </p>
              </div>
            </div>
          </div>
          <div className='flex text-gray-600 items-center text-start w-full px-2 gap-2'>
            <div className='flex flex-col'>
              <label className='font-medium sm:text-lg required'>
                Gender:{" "}
              </label>
              <p className='select-none text-red-500 font-medium text-sm'>
                &nbsp;
              </p>
            </div>
            <div className='flex flex-col text-base'>
              <div className='flex gap-4 '>
                <label className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='gender'
                    value='Male'
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='gender'
                    value='Female'
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
              <p className='select-none text-red-500 font-medium text-sm'>
                {errors.gender}&nbsp;
              </p>
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className={`select-none mb-5 ${
              isLoading
                ? "bg-gray-500 translate-y-2"
                : "bg-[#4A5BE6] cursor-pointer active:translate-y-2 active:shadow-none hover:shadow-xl shadow-lg"
            } p-2 rounded-lg tracking-wide text-white sm:text-lg  duration-300 shadow-gray-400  w-[200px] max-sm:w-full`}>
            {!isLoading ? "SIGNUP" : "SIGNING UP..."}
          </button>
          <p className='text-gray-500'>
            Already have an account?{" "}
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

export default SignUpPage;
