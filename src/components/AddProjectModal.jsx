import React, { useState } from "react";
import API from "../api/axios";
import "../styles/AddProjectModal.css";

export default function AddProjectModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
        const response = await API.post("/projects", {
          title,
          status: status.toLowerCase(),
          description,
        });

      onSave(response.data);
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h5>Add New Project</h5>
          <button className="close-btn" onClick={onClose} disabled={loading}>✕</button>
        </div>
        <div className="custom-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                placeholder="Title of your Project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={description}
                placeholder="Write project description"
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
              <button type="submit" className="add-btn" disabled={loading}>{loading ? "Saving..." : "Add Project"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
