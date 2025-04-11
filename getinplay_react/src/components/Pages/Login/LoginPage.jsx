import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function validateFields() {
    let tempErrors = { username: "", password: "" };
    let isValid = true;

    if (!username) {
      tempErrors.username = "Username is required!";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required!";
      isValid = false;
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters!";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateFields()) return;

    const data = { username, password };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Api/check_login.php`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        document.cookie = `authToken=${res.data.token}; path=/;`;
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
          className='lg:w-[50%] md:w-[65%] max-md:w-[90%] max-w-[400px] min-h-max sm:p-5 rounded-xl bg-white flex flex-col gap-3 items-center justify-between'>
          {/* <img
            className='w-[200px] py-5 object-contain'
            src='/assets/images/getinplay.png'
            alt='GetInPlay Logo'
          /> */}
          <div>
            <p className='text-3xl sm:text-4xl font-bold text-[#4A5BE6] text-center'>
              WELCOME
            </p>
            <p className='sm:text-lg font-light text-gray-400'>
              Login to your account
            </p>
          </div>
          <div className='flex flex-col pt-2 items-center justify-center w-full sm:text-lg font-medium text-gray-600'>
            <div className='flex flex-col text-start w-full'>
              <label className='px-2'>Username</label>
              <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                <input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Username'
                  className='grow min-w-0 outline-none border-none'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <p className='select-none text-red-500 text-sm px-2'>
                {errors.username}&nbsp;
              </p>
            </div>

            <div className='flex flex-col text-start w-full'>
              <label htmlFor='password' className='px-2'>
                Password
              </label>
              <div className='flex items-center gap-1 focus-within:shadow-md focus-within:scale-[1.02] duration-300 rounded-xl px-4 py-2 bg-gray-200 w-full'>
                <input
                  type={showPass ? "text" : "password"}
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='grow min-w-0 outline-none border-none'
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* <div className="w-full flex justify-end select-none px-1">
              <Link
                to={"/forgot-password"}
                className="text-[#4A5BE6] hover:text-blue-900 text-end"
                viewTransition>
                Forgot password?
              </Link>
            </div> */}
          </div>

          <button
            type='submit'
            className='select-none mb-5 cursor-pointer bg-[#4A5BE6] p-2 rounded-lg tracking-wide text-white sm:text-lg active:translate-y-2 active:shadow-none duration-300 shadow-gray-400 hover:shadow-xl shadow-lg w-full'>
            LOGIN
          </button>
          <p className='text-gray-500'>
            Don't have an account?{" "}
            <Link to={"/signup"} className='cursor-pointer text-[#4A5BE6]'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
