import { NavLink } from "react-router-dom";

function NavBarLink({ children, toLink, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      to={toLink}
      className='max-lg:px-3 select-none navbarlink-wrapper cursor-pointer text-md text-gray-500'>
      <div className='navbarlink px-1 py-2 font-[600] duration-300 '>
        {children}
      </div>
    </NavLink>
  );
}

export default NavBarLink;
