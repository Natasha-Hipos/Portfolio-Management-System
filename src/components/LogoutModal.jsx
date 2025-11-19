import React from "react";
import "../styles/logoutmodal.css"; // same styling as delete modal

const LogoutModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <>
      <div className="custom-backdrop" onClick={onClose}></div>

      <div className="custom-modal">
        <div className="modal-card">

          {/* Icon */}
          <div className="modal-icon">?</div>

          {/* Message */}
          <h5>Are you sure you want to log out?</h5>

          {/* Buttons */}
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-confirm" onClick={onConfirm}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
