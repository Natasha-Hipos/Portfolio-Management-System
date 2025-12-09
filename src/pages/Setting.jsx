import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Setting.css";

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: "bi-person",
          label: "Edit Profile",
          hasArrow: true,
        },
        {
          icon: "bi-shield-check",
          label: "Account Security",
          hasArrow: true,
        },
        {
          icon: "bi-key",
          label: "Change Password",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Privacy",
      items: [
        {
          icon: "bi-lock",
          label: "Privacy Settings",
          hasArrow: true,
        },
        {
          icon: "bi-eye-slash",
          label: "Blocked Users",
          hasArrow: true,
        },
        {
          icon: "bi-globe",
          label: "Public Profile",
          toggle: true,
          value: true,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: "bi-bell",
          label: "Push Notifications",
          toggle: true,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          icon: "bi-envelope",
          label: "Email Notifications",
          toggle: true,
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
        {
          icon: "bi-chat-dots",
          label: "Message Alerts",
          toggle: true,
          value: true,
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: "bi-shield-lock",
          label: "Two-Factor Authentication",
          hasArrow: true,
        },
        {
          icon: "bi-device-hdd",
          label: "Active Sessions",
          hasArrow: true,
        },
        {
          icon: "bi-file-lock",
          label: "Data & Privacy",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          icon: "bi-moon-stars",
          label: "Dark Mode",
          toggle: true,
          value: darkModeEnabled,
          onChange: setDarkModeEnabled,
        },
        {
          icon: "bi-fonts",
          label: "Font Size",
          hasArrow: true,
        },
        {
          icon: "bi-palette",
          label: "Theme",
          hasArrow: true,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: "bi-info-circle",
          label: "App Version",
          value: "1.0.0",
          hasArrow: false,
        },
        {
          icon: "bi-question-circle",
          label: "Help & Support",
          hasArrow: true,
        },
        {
          icon: "bi-file-text",
          label: "Terms of Service",
          hasArrow: true,
        },
        {
          icon: "bi-shield-check",
          label: "Privacy Policy",
          hasArrow: true,
        },
      ],
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Handle logout logic here
      console.log("Logging out...");
    }
  };

  return (
    <Layout>
      <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-page-title">Settings</h1>
      </div>

      <div className="settings-content">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="settings-group">
            <h2 className="settings-group-title">{section.title}</h2>
            <div className="settings-list">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`settings-list-item ${item.hasArrow ? "settings-list-item-clickable" : ""}`}
                >
                  <div className="settings-item-left">
                    <div className="settings-item-icon">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div className="settings-item-content">
                      <span className="settings-item-label">{item.label}</span>
                      {item.value && typeof item.value === "string" && (
                        <span className="settings-item-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                  <div className="settings-item-right">
                    {item.toggle ? (
                      <label className="settings-toggle-switch">
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={(e) => item.onChange && item.onChange(e.target.checked)}
                        />
                        <span className="settings-toggle-slider"></span>
                      </label>
                    ) : item.hasArrow ? (
                      <i className="bi bi-chevron-right settings-arrow-icon"></i>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="settings-logout-section">
          <button className="settings-logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Setting;

