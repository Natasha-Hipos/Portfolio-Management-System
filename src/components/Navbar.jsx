import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-section d-flex justify-content-between align-items-center px-4 py-3">
      <div className="search-box">
        <input type="text" className="form-control" placeholder="Search" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="admin-info d-flex align-items-center">
        <span className="fw-bold me-2">Admin</span>
        <i className="fa-solid fa-user-circle fa-2x"></i>
      </div>
    </nav>
  );
};

export default Navbar;
