import React, { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

// Create a Context
const NotificationContext = createContext();

// Hook to use notifications easily
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Show a notification
  const showNotification = (message, type = "success", duration = 3000) => {
    setNotification({ message, type, duration });
  };

  // Hide the notification
  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
