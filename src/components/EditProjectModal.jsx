import React, { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/AddProjectModal.css";

export default function EditProjectModal({ show, onClose, project, onUpdated }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setStatus(project.status || "Ongoing");
      setDescription(project.description || "");
    }
  }, [project]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.put(`/projects/${project.id}`, {
        title,
        status,
        description,
      });
      onUpdated(response.data); // ✅ fixed
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h5>Edit Project</h5>
          <button className="close-btn" onClick={onClose} disabled={loading}>✕</button>
        </div>
        <div className="custom-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading}/>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
              <button type="submit" className="add-btn" disabled={loading}>{loading ? "Updating..." : "Update Project"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
