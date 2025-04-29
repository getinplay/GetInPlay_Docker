import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function AboutUsPage() {
  return (
    <div className='flex flex-col gap-3 justify-between p-5 font-semibold'>
      <h1 className='sm:text-5xl text-4xl p-3 font-bold text-gray-700'>
        About Us
      </h1>
      <div className='rounded-xl text-gray-600 text-lg sm:text-xl p-5 max-w-[1000px] grow flex sm:flex-row flex-col gap-5 justify-center'>
        <div className='flex-1/2 w-full'>
          <img
            src='assets/images/chess.jpeg'
            alt='about-us'
            className='h-[250px] w-full object-cover rounded-xl'
          />
        </div>
        <div className=' flex-1/2 flex flex-col gap-3'>
          <Link
            to='https://maps.app.goo.gl/GxYPGCMzoLDwKCb39'
            target='__blank'
            className='hover:underline underline-offset-3 decoration-2 flex gap-3 text-start xs:text-justify'>
            <span>
              <FontAwesomeIcon icon={faMapLocationDot} />
            </span>
            National Plaza, S7, RC Dutt Rd, Aradhana Society, Vishwas Colony,
            Alkapuri Vadodara, Gujarat 390007
          </Link>
          <div className='flex flex-col gap-3 justify-between w-full'>
            <Link
              to='tel:9123456789'
              className='flex gap-3 items-center hover:underline decoration-2 underline-offset-3'>
              <span>
                <FontAwesomeIcon icon={faPhone} />
              </span>
              +91 9123456789
            </Link>
            <a
              href='mailto:tempmail@gmail.com'
              className='flex gap-3 items-center hover:underline decoration-2 underline-offset-3'>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              tempmail@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
