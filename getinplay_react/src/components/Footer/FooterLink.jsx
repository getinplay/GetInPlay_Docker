import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

FooterLink.propTypes = {
  toLink: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function FooterLink({ toLink, icon, children }) {
  return (
    <div>
      <NavLink
        to={toLink}
        viewTransition
        className={({ isActive }) =>
          ` ${
            isActive ? "!text-[#4A5BE6] font-bold" : ""
          } flex hover:text-[#1529be] text-sm w-max duration-300 cursor-pointer`
        }>
        <span className='mr-1 fa-fw'>
          <FontAwesomeIcon icon={icon} size='sm' />
        </span>
        <p>{children}</p>
      </NavLink>
    </div>
  );
}

export default FooterLink;
