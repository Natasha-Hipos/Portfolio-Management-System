import React, { useEffect, useState } from "react";
import "../styles/Notification.css";

const Notification = ({ message, type = "success", onClose, duration = 10 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setVisible(true);

    // Auto close timer
    const timer = setTimeout(() => {
      setVisible(false); // start exit animation
      setTimeout(() => onClose(), 0); // wait 1.5s for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isSuccess = type === "success";
  const iconClass = isSuccess ? "bi-check-circle-fill" : "bi-x-circle-fill";
  const iconStyleClass = isSuccess ? "notification-icon success" : "notification-icon error";

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
