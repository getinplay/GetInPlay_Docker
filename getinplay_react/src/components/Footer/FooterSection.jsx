import { Link } from "react-router-dom";
import FooterLink from "./FooterLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faHouse,
  faGamepad,
  faAward,
  faPhone,
  faAddressCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function FooterSection() {
  return (
    <div className='w-full'>
      <div className='w-full justify-between mt-10 max-xs:items-start bg-gray-100 text-white flex max-md:flex-col items-center p-3 lg:px-10'>
        <div className='p-2 z-20 max-md:w-full max-md:flex justify-center'>
          <Link to={"/"}>
            <img
              src='/assets/images/getinplay.png'
              alt='GETINPLAY LOGO'
              className='object-contain p-2 md:w-[200px] w-[200px]'
            />
          </Link>
        </div>
        <div className='xs:justify-evenly grow flex flex-col xs:flex-row text-start lg:px-10 xs:px-10 md:px-3'>
          <div className='p-4 lg:w-[200px] sm:w-[150px] lg:max-w-[250px] lg:grow'>
            <p className='text-xl font-bold mb-2 text-black'>Pages</p>
            <div className='xl:grid-cols-2 grid-cols-1 gap-1 grid font-semibold text-[#212121]'>
              <FooterLink toLink='/' icon={faHouse}>
                Home
              </FooterLink>
              <FooterLink toLink='/games' icon={faGamepad}>
                Games
              </FooterLink>
              <FooterLink toLink='/membership' icon={faAward}>
                Membership
              </FooterLink>
              <FooterLink toLink='/contact-us' icon={faPhone}>
                Contact Us
              </FooterLink>
              <FooterLink toLink='/about-us' icon={faAddressCard}>
                About Us
              </FooterLink>
            </div>
          </div>
          <div className='flex-1 max-w-[400px] text-start p-4 rounded-lg text-sm'>
            <p className='text-xl text-black font-bold'>Contact</p>
            <div className='text-[#212121] font-semibold p-1 rounded-md'>
              <Link
                to='https://maps.app.goo.gl/GxYPGCMzoLDwKCb39'
                target='__blank'
                className='hover:text-black flex hover:underline underline-offset-2 cursor-pointer xs:text-justify'>
                <span className='mr-1 fa-fw'>
                  <FontAwesomeIcon icon={faMapLocationDot} />
                </span>
                National Plaza, S7, RC Dutt Rd, Aradhana Society, Vishwas
                Colony, Alkapuri, Vadodara, Gujarat 390007
              </Link>
            </div>
            <div className='flex flex-col xl:flex-row justify-between'>
              <div className='text-[#212121] font-semibold p-1 rounded-md'>
                <Link
                  to='tel:9123456789'
                  className='hover:text-black hover:underline underline-offset-2 cursor-pointer'>
                  <span className='mr-1 fa-fw'>
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  +91 9123456789
                </Link>
              </div>
              <div className='text-[#212121] font-semibold p-1 rounded-md'>
                <a
                  href='mailto:tempmail@gmail.com'
                  className='hover:text-black flex hover:underline underline-offset-2 cursor-pointer'>
                  <span className='mr-1 fa-fw'>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <div>tempmail@gmail.com</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='p-4 flex flex-col justify-center max-xs:w-full'>
          <p className='text-xl text-black font-bold '>Follow us</p>
          <div className='flex justify-center grow gap-4 items-center text-[#212121] py-4'>
            <Link to={"https://www.facebook.com/profile.php?id=61574906180529"}>
              <FontAwesomeIcon
                icon={faFacebook}
                size='xl'
                className='cursor-pointer hover:text-[#1877F2] active:text-[#1877F2] duration-300 active:scale-[1.1] hover:scale-[1.1]'
              />
            </Link>
            <Link to={"https://x.com/get_in_play"}>
              <FontAwesomeIcon
                icon={faXTwitter}
                size='xl'
                className='cursor-pointer hover:text-[#1DA1F2] active:text-[#1DA1F2] duration-300 active:scale-[1.1] hover:scale-[1.1]'
              />
            </Link>
            <Link to={"https://www.youtube.com/@GetInPlay-c8c"}>
              <FontAwesomeIcon
                icon={faYoutube}
                size='xl'
                className='cursor-pointer hover:text-[#FF0000] active:text-[#FF0000] duration-300 active:scale-[1.1] hover:scale-[1.1]'
              />
            </Link>
            <Link to={"https://www.instagram.com/get_in_play/"}>
              <FontAwesomeIcon
                icon={faInstagram}
                size='xl'
                className='cursor-pointer hover:text-[#c92bb7] active:text-[#c92bb7] duration-300 active:scale-[1.1] hover:scale-[1.1]'
              />
            </Link>
          </div>
        </div>
      </div>
      <p className='bg-gray-600 text-gray-100 p-2 font-medium tracking-wide'>
        Copyright © 2025 GetInPlay
      </p>
    </div>
  );
}

export default FooterSection;
