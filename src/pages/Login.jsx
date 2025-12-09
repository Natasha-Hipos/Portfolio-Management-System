import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Start loading
    setLoading(true);

    //  Show toast
    toast.success("logged in successfully", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        borderRadius: "20px",
        background: "#fff",
        color: "#000",
        fontSize: "16px",
        fontWeight: "500",
        padding: "10px 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      },
    });

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
        <h2 className="fw-bold mb-2">Login</h2>
        <p className="text-muted mb-4">Portfolio Admin Dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="username"
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
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log in
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />

      <footer className="mt-5 text-muted small">
        © 2025 Portfolio Management System. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
 