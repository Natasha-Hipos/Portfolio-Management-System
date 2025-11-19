import React, { useState } from "react";
import "../styles/AddProjectModal.css";

export default function AddProjectModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const newProject = {
      id: Date.now(),
      title,
      status,
      description,
      createdAt: new Date().toLocaleString(),
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">

        <div className="custom-modal-header">
          <h5>Add New Project</h5>
          <button className="close-btn" onClick={onClose}>✕</button>
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
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={description}
                placeholder="Write project description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>

              <button type="submit" className="add-btn">
                Add Project
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
