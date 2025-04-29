import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProfilePage() {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    username: "",
    membership_id: "",
  });
  // const [originalData, setOriginalData] = useState({
  //   full_name: "",
  //   email: "",
  //   phone_no: "",
  //   username: "",
  //   membership_id: "",
  // });
  const [editMode, setEditMode] = useState({
    full_name: false,
    email: false,
    phone_no: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Create refs for input fields
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const navigate = useNavigate();

  // Convert membership ID to descriptive text
  const getMembershipType = (id) => {
    const memberships = {
      1: "Basic",
      2: "Silver",
      3: "Gold",
    };
    return memberships[id] || "Standard";
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setFetchLoading(true);
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
          `${import.meta.env.VITE_API_URL}/Api/decode.php`,
          { token },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          setUserData(response.data.data);
          // setOriginalData(response.data.data); // Store original data for comparison
        } else {
          toast.error(response.data.message || "Failed to fetch user data.", {
            pauseOnHover: false,
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("An error occurred while fetching your profile data.", {
          pauseOnHover: false,
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Focus input when edit mode changes
  useEffect(() => {
    if (editMode.full_name && nameInputRef.current) {
      nameInputRef.current.focus();
    }
    if (editMode.email && emailInputRef.current) {
      emailInputRef.current.focus();
    }
    if (editMode.phone_no && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [editMode]);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name))
      return "Name can only contain letters and spaces";
    if (/\s\s/.test(name)) return "Name cannot contain consecutive spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required";
    // Indian phone number validation - starts with 6, 7, 8, or 9 and has a total of 10 digits
    if (!/^[6-9]\d{9}$/.test(phone))
      return "Enter valid Indian phone number (10 digits starting with 6, 7, 8, or 9)";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(userData.full_name);
    if (nameError) newErrors.full_name = nameError;

    const emailError = validateEmail(userData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(userData.phone_no);
    if (phoneError) newErrors.phone_no = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes without validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error if field had errors before
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Toggle edit mode for a field
  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only validate on submit
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
        `${import.meta.env.VITE_API_URL}/Api/profile_update.php`,
        {
          token,
          name: userData.full_name,
          email: userData.email,
          phone_no: userData.phone_no,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!", {
          pauseOnHover: false,
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });

        // Update original data to match current data
        // setOriginalData({
        //   ...userData,
        // });

        // Reset all edit modes
        setEditMode({
          full_name: false,
          email: false,
          phone_no: false,
        });
      } else {
        toast.error(response.data.message || "Failed to update profile.", {
          pauseOnHover: false,
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.", {
        pauseOnHover: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-xl text-gray-600'>Loading profile data...</div>
      </div>
    );
  }

  return (
    <div className='max-w-max w-full mt-5 rounded-lg p-4'>
      <h1 className='text-2xl sm:text-3xl font-semibold text-gray-700 pb-3 text-center'>
        Profile
      </h1>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1 items-center justify-center shadow-[0_2px_16px_rgba(0,0,0,0.4)] rounded-lg p-5 w-full sm:text-lg font-medium text-gray-600'>
          <div className='flex w-full max-sm:flex-col sm:gap-5 '>
            <div className='w-full'>
              {/* Name Field */}
              <div className='flex flex-col text-start w-full'>
                <label
                  htmlFor='full_name'
                  className='cursor-pointer required text-gray-700 font-semibold px-2'>
                  Name
                </label>
                <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
                  <input
                    ref={nameInputRef}
                    name='full_name'
                    id='full_name'
                    placeholder='John Doe'
                    className={`grow min-w-0 outline-none border-none bg-transparent`}
                    value={userData.full_name}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor='full_name'
                    onClick={() => toggleEditMode("full_name")}
                    className='text-gray-500 focus:outline-none cursor-pointer'>
                    <FontAwesomeIcon
                      className={`fa-fw`}
                      icon={faPen}
                      size='sm'
                    />
                  </label>
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.full_name || "\u00A0"}
                </p>
              </div>

              {/* Phone Number Field */}
              <div className='flex flex-col text-start w-full'>
                <p
                  htmlFor='phone_no'
                  className='required text-gray-700 font-semibold px-2'>
                  Phone Number
                </p>
                <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
                  <input
                    ref={phoneInputRef}
                    name='phone_no'
                    id='phone_no'
                    placeholder='9876543210'
                    className={`grow min-w-0 outline-none border-none bg-transparent `}
                    value={userData.phone_no}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor='phone_no'
                    onClick={() => toggleEditMode("phone_no")}
                    className='text-gray-500 focus:outline-none cursor-pointer'>
                    <FontAwesomeIcon
                      className={`fa-fw `}
                      icon={faPen}
                      size='sm'
                    />
                  </label>
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.phone_no || "\u00A0"}
                </p>
              </div>

              {/* Email Field */}
              <div className='flex flex-col text-start w-full'>
                <label
                  htmlFor='email'
                  className='cursor-pointer required text-gray-700 font-semibold px-2'>
                  Email
                </label>
                <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
                  <input
                    ref={emailInputRef}
                    name='email'
                    id='email'
                    placeholder='johndoe@gmail.com'
                    className={`grow min-w-0 outline-none border-none bg-transparent`}
                    value={userData.email}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor='email'
                    onClick={() => toggleEditMode("email")}
                    className='text-gray-500 focus:outline-none cursor-pointer'>
                    <FontAwesomeIcon
                      className={`fa-fw `}
                      icon={faPen}
                      size='sm'
                    />
                  </label>
                </div>
                <p className='select-none text-red-500 text-sm px-2'>
                  {errors.email || "\u00A0"}
                </p>
              </div>
            </div>

            <div className='w-full'>
              {/* Username Field (Non-editable) */}
              <div className='flex flex-col text-start w-full'>
                <label
                  htmlFor='username'
                  className='text-gray-700 font-semibold px-2'>
                  Username
                </label>
                <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
                  <input
                    disabled
                    name='username'
                    id='username'
                    placeholder='johndoe123'
                    className='grow min-w-0 outline-none border-none bg-transparent cursor-not-allowed'
                    value={userData.username}
                    readOnly
                  />
                  <label className='opacity-0'>
                    <FontAwesomeIcon
                      className={`fa-fw`}
                      icon={faPen}
                      size='sm'
                    />
                  </label>
                </div>
                <p className='select-none text-transparent text-sm px-2'>
                  &nbsp;
                </p>
              </div>

              {/* Membership Field (Non-editable) */}
              <div className='flex flex-col text-start w-full'>
                <label
                  htmlFor='membership'
                  className='text-gray-700 font-semibold px-2'>
                  Membership
                </label>
                <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
                  <input
                    disabled
                    name='membership'
                    id='membership'
                    placeholder='Gold'
                    className='grow min-w-0 outline-none border-none bg-transparent cursor-not-allowed'
                    value={getMembershipType(userData.membership_id)}
                    readOnly
                  />
                </div>
                <p className='select-none text-transparent text-sm px-2'>
                  &nbsp;
                </p>
              </div>

              <div className='flex flex-col text-start w-full'>
                <label
                  htmlFor='gender'
                  className='text-gray-700 font-semibold px-2'>
                  Gender
                </label>
                <div className='flex bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'>
                  <input
                    disabled
                    name='gender'
                    id='gender'
                    placeholder='Gender'
                    className='grow min-w-0 outline-none border-none bg-transparent cursor-not-allowed'
                    value={userData.gender}
                    readOnly
                  />
                </div>
                <p className='select-none text-transparent text-sm px-2'>
                  &nbsp;
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button - Enabled when data is modified */}
          <button
            type='submit'
            className={`select-none mt-2 bg-[#4A5BE6] p-3 py-1 rounded-lg tracking-wide font-normal text-white sm:text-lg active:translate-y-2 active:shadow-none duration-300 shadow-gray-400 w-full sm:w-[210px] ${
              loading
                ? "bg-gray-500 text-gray-200 translate-y-2 shadow-none"
                : "hover:shadow-xl shadow-lg cursor-pointer"
            }`}>
            {loading ? "UPDATING..." : "UPDATE PROFILE"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
