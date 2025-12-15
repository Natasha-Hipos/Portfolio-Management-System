import React, { useState } from "react";
import API from "../api/axios";
import "../styles/modals.css";

export default function DeleteModal({ show, onClose, projectId, onDeleted }) {
  const [loading, setLoading] = useState(false);
  if (!show) return null;

  const handleConfirm = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      await API.delete(`/projects/${projectId}`);
      onDeleted(projectId);
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center rounded-4">
            <h5 className="fw-bold mb-3">Are you sure you want to delete this?</h5>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
              <button className="btn btn-danger" onClick={handleConfirm} disabled={loading}>
                {loading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}
