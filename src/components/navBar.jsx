import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav px-4">
      <Link to="/" className="nav-link">
        Main
      </Link>
      <Link to="/login" className="nav-link">
        Login
      </Link>
      <Link to="/users" className="nav-link">
        Users
      </Link>
    </nav>
  );
};

export default NavBar;
