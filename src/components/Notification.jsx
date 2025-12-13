import React, { useEffect, useState } from "react";
import "../styles/Notification.css";

const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      const cleanup = setTimeout(() => onClose(), 500);
      return () => clearTimeout(cleanup);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const iconClass = type === "success" ? "bi-check-circle-fill" : "bi-x-circle-fill";
  const iconStyleClass = type === "success" ? "notification-icon success" : "notification-icon error";

  return (
    <div className={`notification-container ${visible ? "slide-in" : "slide-out"}`}>
      <div className="notification-content">
        <i className={`bi ${iconClass} ${iconStyleClass}`}></i>
        <span className="notification-message">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
