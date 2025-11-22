import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Setting.css";

const Setting = () => {
  const [activeSection, setActiveSection] = useState("account-security");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <Layout>
      <div className="settings-container">
        {/* Settings Navigation Sidebar */}
        <div className="settings-sidebar">
          <h5 className="settings-sidebar-title">Settings</h5>
          <nav className="settings-nav">
            <button
              className={`settings-nav-item ${
                activeSection === "profile" ? "active" : ""
              }`}
              onClick={() => setActiveSection("profile")}
            >
              Profile
            </button>
            <button
              className={`settings-nav-item ${
                activeSection === "account-security" ? "active" : ""
              }`}
              onClick={() => setActiveSection("account-security")}
            >
              Account Security
            </button>
            <button
              className={`settings-nav-item ${
                activeSection === "notifications" ? "active" : ""
              }`}
              onClick={() => setActiveSection("notifications")}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Main Settings Content */}
        <div className="settings-main-content">
          {activeSection === "account-security" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Account Security</h2>

              {/* Account Informations Card */}
              <div className="settings-card">
                <h5 className="settings-card-title">Account Informations</h5>
                <div className="settings-card-content">
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <label className="settings-label">Email address</label>
                      <p className="settings-value">a***n@hey.com</p>
                      <p className="settings-note">
                        If you need to change your e-mail address, please contact{" "}
                        <a href="#" className="settings-link">
                          Customer Service
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <label className="settings-label">Wallet address</label>
                      <p className="settings-value">
                        Log in with your preferred wallet address
                      </p>
                    </div>
                    <button className="settings-btn-primary">Connect wallet</button>
                  </div>
                </div>
              </div>

              {/* Security Settings Card */}
              <div className="settings-card">
                <h5 className="settings-card-title">Security Settings</h5>
                <div className="settings-card-content">
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <label className="settings-label">Google Authenticator (2FA)</label>
                      <p className="settings-description">
                        Use the Authenticator to get verification codes for better security.
                      </p>
                    </div>
                    <div className="settings-toggle-wrapper">
                      <label className="settings-toggle">
                        <input
                          type="checkbox"
                          checked={twoFactorEnabled}
                          onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        />
                        <span className="settings-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <label className="settings-label">Password</label>
                      <p className="settings-description">
                        Set a unique password for better protection.
                      </p>
                    </div>
                    <button className="settings-btn-secondary">Set password</button>
                  </div>
                </div>
              </div>

              {/* Devices and Activities Card */}
              <div className="settings-card">
                <h5 className="settings-card-title">Devices and Activities</h5>
                <div className="settings-card-content">
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <label className="settings-label">Device Management</label>
                      <p className="settings-description">
                        Authorize devices with access to your account.
                      </p>
                    </div>
                    <button className="settings-btn-secondary">Manage</button>
                  </div>
                  <div className="settings-device-item">
                    <div className="settings-device-info">
                      <p className="settings-device-name">Arc on macOS</p>
                      <p className="settings-device-status">
                        <span className="status-active">Current session</span>
                        <span className="settings-device-separator">•</span>
                        <span className="settings-device-time">In use: 126</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Profile</h2>
              <div className="settings-card">
                <h5 className="settings-card-title">Profile Information</h5>
                <div className="settings-card-content">
                  <p className="settings-description">
                    Manage your profile information and preferences.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Notifications</h2>
              <div className="settings-card">
                <h5 className="settings-card-title">Notification Preferences</h5>
                <div className="settings-card-content">
                  <p className="settings-description">
                    Configure how you receive notifications.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
