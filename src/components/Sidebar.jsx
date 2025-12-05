import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    document.body.classList.add("sidebar-expanded");
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("sidebar-expanded");
  };

  // clicking a sidebar link should CLOSE sidebar hover mode
  const handleLinkClick = () => {
    document.body.classList.remove("sidebar-expanded");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("sidebar-expanded");
    };
  }, []);

  return (
    <>
      <aside
        className="sidebar d-flex flex-column align-items-center py-3"
        id="sidebar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="portfolio-admin">Portfolio Admin</div>
        <hr className="sidebar-divider" />

        <div className="menu-container">
          <span className="menu-text">Menu</span>
          {/*toggleSidebar */}
          <i className="bi bi-list" id="hamburger-toggle"></i>
        </div>

        <Link to="/dashboard" className="icon-container" onClick={handleLinkClick}>
          <i className="bi bi-grid"></i>
          <span className="icon-text">Dashboard</span>
        </Link>

        <Link to="/project" className="icon-container" onClick={handleLinkClick}>
          <i className="bi bi-folder"></i>
          <span className="icon-text">Project</span>
        </Link>

        <Link to="/skills" className="icon-container" onClick={handleLinkClick}>
          <i className="bi bi-pie-chart"></i>
          <span className="icon-text">Skills</span>
        </Link>

        <Link to="/experience" className="icon-container" onClick={handleLinkClick}>
          <i className="bi bi-file-earmark-text"></i>
          <span className="icon-text">Experience</span>
        </Link>

        <Link to="/profile" className="icon-container" onClick={handleLinkClick}>
          <i className="bi bi-person"></i>
          <span className="icon-text">Profile</span>
        </Link>

        <Link to="/setting" className="icon-container" onClick={handleLinkClick}>
          <i className="bi bi-gear"></i>
          <span className="icon-text">Settings</span>
        </Link>

        <hr className="sidebar-divider mt-auto" />

        <button
          className="icon-container logout-btn"
          onClick={() => setShowLogout(true)}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="icon-text">Log Out</span>
        </button>
      </aside>

      <LogoutModal
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          navigate("/");
        }}
      />
    </>
  );
};

export default Sidebar;
