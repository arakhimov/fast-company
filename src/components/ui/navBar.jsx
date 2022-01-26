/* eslint-disable multiline-ternary */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGetCurrentUserData } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const currentUser = useSelector(getGetCurrentUserData());

  return (
    <nav className="nav d-flex align-items-center justify-content-between bg-light px-3">
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item border-0 bg-light">
          <Link to="/" className="nav-link">
            Main
          </Link>
        </li>
        {currentUser && (
          <li className="list-group-item border-0 bg-light">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
        )}
      </ul>
      <div className="nav__login d-flex align-items-center">
        {currentUser ? (
          <NavProfile />
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
