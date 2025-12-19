import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
import { useNotification } from "../contexts/NotificationContext";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // track whether we are on a small screen where we show bottom nav
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 420px)");
    const update = (e) => setIsMobile(!!e.matches);
    // init
    update(mq);
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  const handleMouseEnter = () => {
    // only expand on non-mobile (desktop)
    if (!isMobile) {
      document.body.classList.add("sidebar-expanded");
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      document.body.classList.remove("sidebar-expanded");
    }
  };

  // clicking a sidebar link should CLOSE sidebar hover mode (desktop only)
  const handleLinkClick = () => {
    if (!isMobile) {
      document.body.classList.remove("sidebar-expanded");
    }
  };

  useEffect(() => {
    // cleanup on unmount
    return () => {
      document.body.classList.remove("sidebar-expanded");
    };
  }, []);

  return (
    <>
      <aside
        className={`sidebar d-flex flex-column align-items-center py-3 ${isMobile ? "bottom-nav" : ""}`}
        id="sidebar"
        onMouseEnter={isMobile ? undefined : handleMouseEnter}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        role="navigation"
        aria-label="Main sidebar"
      >
        <div className="portfolio-admin">Portfolio Admin</div>
        <hr className="sidebar-divider" />

        <div className="menu-container">
          <span className="menu-text">Menu</span>
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