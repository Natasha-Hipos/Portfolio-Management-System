import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Login.css";
import { useNotification } from "../contexts/NotificationContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Start loading
    setLoading(true);

    // Show notification
    showNotification("Logged in successfully", "success");

    // Redirect after loading
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      <div className="login-box text-center shadow-lg">
        <div className="login-header">
          <h2 className="fw-bold mb-2">Login</h2>
          <p className="text-muted mb-4">Portfolio Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div className="mb-4 text-start">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter Password"
                required
              />
              <span
                className="input-group-text bg-white password-toggle"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>          
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log in
          </button>
        </form>
      </div>

      <footer className="mt-5 text-muted small">
        © 2025 Portfolio Management System. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;