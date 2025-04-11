import NavBarLink from "./NavBarLink";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHistory,
  faUser,
  faRightFromBracket,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const navLinksRef = useRef();
  const profileRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const closeNavLinks = (e) => {
    if (navLinksRef.current === e.target) {
      setShowNav((prev) => !prev);
    }
  };

  function capitalizeName(name) {
    let splitNames = name.toLowerCase().split(" ");
    for (let i = 0; i < splitNames.length; i++) {
      splitNames[i] =
        splitNames[i].charAt(0).toUpperCase() +
        splitNames[i].slice(1, splitNames[i].length);
    }
    return splitNames.join(" ");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  useEffect(() => {
    const getInfo = async () => {
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
      setUserData(res.data);
      setIsLogin(res.data.success);
    };
    getInfo();

    if (window.innerWidth < 1024 && showNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Ensure scrolling is enabled when component unmounts
    };
  }, [showNav]);

  return (
    <nav className='sticky md:px-5 top-0 z-30 bg-white h-18 flex w-full max-sm:px-1 py-1 items-center justify-between border-b-1 border-gray-200'>
      <div className='p-2 z-20 lg:w-[250px] w-[170px]'>
        <Link to={"/"}>
          <img
            src='/assets/images/getinplay.png'
            alt='GETINPLAY LOGO'
            className='object-contain'
          />
        </Link>
      </div>

      <div
        ref={navLinksRef}
        onClick={closeNavLinks}
        className={`${
          showNav ? "" : "max-lg:hidden"
        } lg:relative max-lg:mt-18 max-lg:flex justify-end backdrop-blur-xs duration-300 bg-gray-200/50 max-lg:inset-0 absolute max-lg:h-dvh w-full z-10`}>
        <div className='max-lg:border-l-1 border-gray-200 text-sm sm:text-base bg-white flex lg:w-auto sm:w-max md:w-45 lg:flex-row flex-col items-start lg:gap-5 lg:m-0'>
          <NavBarLink onClick={() => setShowNav(false)} toLink='/'>
            Home
          </NavBarLink>
          <NavBarLink onClick={() => setShowNav(false)} toLink='/games'>
            Games
          </NavBarLink>
          <NavBarLink onClick={() => setShowNav(false)} toLink='/membership'>
            Membership
          </NavBarLink>
          <NavBarLink onClick={() => setShowNav(false)} toLink='/contact-us'>
            Contact Us
          </NavBarLink>
          <NavBarLink onClick={() => setShowNav(false)} toLink='/about-us'>
            About Us
          </NavBarLink>
          {!isLogin && (
            <div className='sm:hidden w-full'>
              <div
                onClick={() => {
                  navigate("/login");
                  setShowNav(false);
                }}
                className='flex justify-center select-none bg-[#4A5BE6] text-white hover:bg-[#1529be] items-center gap-2 py-0.5 2xs:py-1 px-1 2xs:px-2 md:px-6 h-min shadow-gray-400 shadow-md my-2 m-2 cursor-pointer rounded-md active:translate-y-1 active:shadow-none duration-300'>
                <FontAwesomeIcon icon={faRightToBracket} />
                <div>Login</div>
              </div>
              <div
                onClick={() => {
                  navigate("/signup");
                  setShowNav(false);
                }}
                className='flex justify-center select-none text-[#4A5BE6] bg-gray-50 hover:bg-gray-200 items-center gap-2 py-0.5 2xs:py-1 px-1 2xs:px-2 md:px-6 h-min shadow-gray-400 shadow-md my-2 m-2 cursor-pointer rounded-md active:translate-y-1 active:shadow-none duration-300'>
                <FontAwesomeIcon className='fa-fw' icon={faUserPlus} />
                <div>SignUp</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex gap-1 h-full items-center 2xs:text-sm sm:text-base text-xs font-medium z-20'>
        {!isLogin ? (
          <div className='max-sm:hidden flex'>
            <div
              onClick={() => navigate("/login")}
              className='select-none bg-[#4A5BE6] text-white hover:bg-[#1529be] flex items-center gap-2 py-0.5 2xs:py-1 px-1 2xs:px-2 md:px-6 h-min shadow-gray-400 shadow-md my-2 m-2 cursor-pointer rounded-md active:translate-y-1 active:shadow-none duration-300'>
              <FontAwesomeIcon icon={faRightToBracket} />
              <div>Login</div>
            </div>
            <div
              onClick={() => navigate("/signup")}
              className='select-none text-[#4A5BE6] bg-gray-50 hover:bg-gray-200 flex items-center gap-2 py-0.5 2xs:py-1 px-1 2xs:px-2 md:px-6 h-min shadow-gray-400 shadow-md my-2 m-2 cursor-pointer rounded-md active:translate-y-1 active:shadow-none duration-300'>
              <FontAwesomeIcon className='fa-fw' icon={faUserPlus} />
              <div>SignUp</div>
            </div>
          </div>
        ) : (
          <div className='h-full relative text-gray-700' ref={profileRef}>
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className='cursor-pointer gap-3 px-3 h-full w-max flex items-center justify-end'>
              <div className='flex text-lg items-center justify-center bg-gray-200 h-7 w-7 rounded-[100px]'>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <p className={`max-xs:hidden`}>
                {capitalizeName(userData.data.full_name)}
              </p>
            </button>
            {showProfile && (
              <div className='flex flex-col gap-1 py-1 overflow-hidden absolute top-[100%] right-0 rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.3)] shadow-black/50 w-max bg-white'>
                <p className={`xs:hidden`}>
                  {userData.data.full_name.toUpperCase()}
                </p>
                <hr className='xs:hidden text-gray-300' />
                <Link
                  to={"profile"}
                  onClick={() => setShowProfile(false)}
                  className='hover:text-[#1529be] cursor-pointer flex gap-2 mx-3 items-center text-gray-600'>
                  <FontAwesomeIcon icon={faUser} />
                  View Profile
                </Link>
                <Link
                  to={"/update-password"}
                  onClick={() => setShowProfile(false)}
                  className='hover:text-[#1529be] cursor-pointer flex gap-2 mx-3 items-center text-gray-600'>
                  <FontAwesomeIcon icon={faLock} />
                  Update Password
                </Link>
                <Link
                  to={"/bookings"}
                  onClick={() => setShowProfile(false)}
                  className='hover:text-[#1529be] cursor-pointer flex gap-2 mx-3 items-center text-gray-600'>
                  <FontAwesomeIcon icon={faHistory} />
                  View Bookings
                </Link>

                <hr className='text-gray-300' />
                <button
                  onClick={() => {
                    setShowProfile(false);
                    document.cookie =
                      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    navigate("/");
                    navigate(0);
                  }}
                  className='cursor-pointer font-medium flex gap-2 mx-3 items-center text-red-600'>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => {
            setShowNav(!showNav);
          }}>
          <FontAwesomeIcon
            icon={faBars}
            className='px-2 cursor-pointer text-lg lg:!hidden'
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
