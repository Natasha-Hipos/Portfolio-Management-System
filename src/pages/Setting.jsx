import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/Setting.css";
import "../styles/modals.css";

const Setting = () => {
  const [activeSection, setActiveSection] = useState("account-security");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    const stored = localStorage.getItem("twoFactorEnabled");
    return stored ? JSON.parse(stored) : true;
  });

  // Modal states
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  // Form states
  const [walletAddress, setWalletAddress] = useState(() => {
    return localStorage.getItem("walletAddress") || "";
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Device management state
  const [devices, setDevices] = useState(() => {
    const stored = localStorage.getItem("devices");
    return stored ? JSON.parse(stored) : [
      { id: 1, name: "Arc on macOS", status: "Current session", time: "126" }
    ];
  });

  // Save 2FA to localStorage
  useEffect(() => {
    localStorage.setItem("twoFactorEnabled", JSON.stringify(twoFactorEnabled));
  }, [twoFactorEnabled]);

  // Save wallet address to localStorage
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
    }
  }, [walletAddress]);

  // Save devices to localStorage
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  // Button handlers
  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleSetPassword = () => {
    setShowPasswordModal(true);
  };

  const handleManageDevices = () => {
    setShowDeviceModal(true);
  };

  // Wallet modal handlers
  const handleWalletSubmit = (e) => {
    e.preventDefault();
    if (!walletAddress.trim()) {
      alert("Please enter a wallet address");
      return;
    }
    localStorage.setItem("walletAddress", walletAddress);
    setShowWalletModal(false);
    alert("Wallet connected successfully!");
  };

  // Password modal handlers
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    // In a real app, you'd send this to backend
    localStorage.setItem("passwordSet", "true");
    setPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);
    alert("Password set successfully!");
  };

  // Device management handlers
  const handleRemoveDevice = (deviceId) => {
    if (window.confirm("Are you sure you want to remove this device?")) {
      setDevices(devices.filter((d) => d.id !== deviceId));
    }
  };

  return (
    <Layout>
      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Connect Wallet</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowWalletModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleWalletSubmit}>
                  <div className="modal-body">
                    <div className="form-group mb-3">
                      <label className="form-label">Wallet Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowWalletModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Connect
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}

      {/* Set Password Modal */}
      {showPasswordModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Set Password</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword("");
                      setConfirmPassword("");
                    }}
                  ></button>
                </div>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="modal-body">
                    <div className="form-group mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <small className="text-muted">
                        Password must be at least 8 characters
                      </small>
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowPasswordModal(false);
                        setPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Set Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}

      {/* Device Management Modal */}
      {showDeviceModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Device Management</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeviceModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted mb-3">
                    Manage devices with access to your account
                  </p>
                  <div className="list-group">
                    {devices.map((device) => (
                      <div
                        key={device.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{device.name}</strong>
                          <div className="small text-muted">
                            <span className={device.status === "Current session" ? "text-success" : ""}>
                              {device.status}
                            </span>
                            {device.time && (
                              <>
                                <span className="mx-2">•</span>
                                <span>In use: {device.time} days</span>
                              </>
                            )}
                          </div>
                        </div>
                        {device.status !== "Current session" && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveDevice(device.id)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeviceModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}

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
                        {walletAddress || "Log in with your preferred wallet address"}
                      </p>
                    </div>
                    <button className="settings-btn-primary" onClick={handleConnectWallet}>
                      {walletAddress ? "Change wallet" : "Connect wallet"}
                    </button>
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
                    <button className="settings-btn-secondary" onClick={handleSetPassword}>
                      {localStorage.getItem("passwordSet") === "true" ? "Change password" : "Set password"}
                    </button>
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
                    <button className="settings-btn-secondary" onClick={handleManageDevices}>
                      Manage
                    </button>
                  </div>
                  {devices.map((device) => (
                    <div key={device.id} className="settings-device-item">
                      <div className="settings-device-info">
                        <p className="settings-device-name">{device.name}</p>
                        <p className="settings-device-status">
                          <span className={device.status === "Current session" ? "status-active" : ""}>
                            {device.status}
                          </span>
                          {device.time && (
                            <>
                              <span className="settings-device-separator">•</span>
                              <span className="settings-device-time">In use: {device.time} days</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
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
