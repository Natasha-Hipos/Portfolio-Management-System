import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
import { useNotification } from "../contexts/NotificationContext";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { showNotification } = useNotification();
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
        role="navigation"
        aria-label="Main sidebar"
      >
        <div className="portfolio-admin">Portfolio Admin</div>
        <hr className="sidebar-divider" />

        <div className="menu-container">
          <span className="menu-text">Menu</span>
          {/*toggleSidebar */}
          <i className="bi bi-list" id="hamburger-toggle" aria-hidden="true"></i>
        </div>

        <Link to="/dashboard" className="icon-container" onClick={handleLinkClick} aria-label="Dashboard">
          <i className="bi bi-grid" aria-hidden="true"></i>
          <span className="icon-text">Dashboard</span>
        </Link>

        <Link to="/project" className="icon-container" onClick={handleLinkClick} aria-label="Project">
          <i className="bi bi-folder" aria-hidden="true"></i>
          <span className="icon-text">Project</span>
        </Link>

        <Link to="/skills" className="icon-container" onClick={handleLinkClick} aria-label="Skills">
          <i className="bi bi-pie-chart" aria-hidden="true"></i>
          <span className="icon-text">Skills</span>
        </Link>

        <Link to="/experience" className="icon-container" onClick={handleLinkClick} aria-label="Experience">
          <i className="bi bi-file-earmark-text" aria-hidden="true"></i>
          <span className="icon-text">Experience</span>
        </Link>

        <Link to="/profile" className="icon-container" onClick={handleLinkClick} aria-label="Profile">
          <i className="bi bi-person" aria-hidden="true"></i>
          <span className="icon-text">Profile</span>
        </Link>

        <Link to="/setting" className="icon-container" onClick={handleLinkClick} aria-label="Settings">
          <i className="bi bi-gear" aria-hidden="true"></i>
          <span className="icon-text">Settings</span>
        </Link>

        <hr className="sidebar-divider mt-auto" />

        <button
          className="icon-container logout-btn"
          onClick={() => setShowLogout(true)}
          aria-label="Log Out"
        >
          <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
          <span className="icon-text">Log Out</span>
        </button>
      </aside>

      <LogoutModal
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          showNotification("Logged out successfully", "success");
          setTimeout(() => {
            navigate("/");
          }, 500);
        }}
      />
    </>
  );
};

export default Sidebar;