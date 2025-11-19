// DeleteModal.jsx
import React from "react";
import "../styles/modals.css";

export default function DeleteModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        id="deleteModal"
        tabIndex="-1"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center rounded-4">
            <h5 className="fw-bold mb-3">
              Are you sure you want to delete this?
            </h5>

            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop show" />
    </>
  );
}
