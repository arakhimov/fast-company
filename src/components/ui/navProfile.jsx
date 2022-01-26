import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGetCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getGetCurrentUserData());
  const [isOpen, setOpen] = useState(false);

  const handleToggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="nav-profile dropdown">
      <button
        type="button"
        className="btn d-flex align-items-center dropdown-toggle"
        onClick={handleToggleMenu}
      >
        <p className="nav-profile__name mb-0 me-2">{currentUser.name}</p>
        <img
          src={currentUser.image}
          className="rounded-circle shadow-1-strong mb-2 me-2"
          alt="avatar"
          height="40"
        />
      </button>
      <ul
        onClick={handleToggleMenu}
        className={`nav-profile__list dropdown-menu w-100${
          isOpen ? " show" : ""
        }`}
        aria-labelledby="dropdownMenuButton1"
      >
        <Link
          to={`/users/${currentUser._id}`}
          className="dropdown-item border-0"
        >
          User Page
        </Link>
        <Link to="/logout" className="dropdown-item border-0">
          Logout
        </Link>
      </ul>
    </div>
  );
};

export default NavProfile;
