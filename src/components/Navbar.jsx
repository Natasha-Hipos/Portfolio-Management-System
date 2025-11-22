import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar-section d-flex justify-content-between align-items-center px-4 py-3">
      
      {/* Search Box */}
      <div className="search-box">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" className="form-control" placeholder="Search" />
      </div>

      {/* Admin Info */}
      <div
        className={`admin-info d-flex align-items-center ${dropdownOpen ? "active" : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="fw-bold me-2">Admin</span>
        <i className="fa-solid fa-user-circle fa-2x"></i>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="admin-dropdown">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
