import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-layout d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="main-section flex-grow-1">
        <Navbar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
