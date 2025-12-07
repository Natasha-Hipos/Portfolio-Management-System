// src/pages/Skills.jsx
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DeleteModal from "../components/DeleteModal";
import "../styles/skills.css";

const rowsPerPage = 5;

/* ============================================================
   CUSTOM MODAL (Same Style as Add Project Modal)
   ============================================================ */
function SkillFormModal({ show, mode = "add", initial = {}, onClose, onSave }) {
  const [name, setName] = useState(initial.name || "");
  const [level, setLevel] = useState(initial.level || "Beginner");
  const [experience, setExperience] = useState(initial.experience || "");
  const [visibility, setVisibility] = useState(initial.visibility || "Show");

  useEffect(() => {
    if (show) {
      setName(initial.name || "");
      setLevel(initial.level || "Beginner");
      setExperience(initial.experience || "");
      setVisibility(initial.visibility || "Show");
    }
  }, [show, initial]);

  if (!show) return null;

  const title = mode === "edit" ? "Edit Skill" : "Add Skill";
  const saveText = mode === "edit" ? "Update" : "Add Skill";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !experience.trim()) {
      alert("⚠ Please fill all required fields.");
      return;
    }

    onSave({
      id: initial.id || Date.now(),
      name: name.trim(),
      level,
      experience: experience.trim(),
      visibility,
    });

    onClose();
  };

  return (
    <>
      <div className="custom-modal-overlay">
        <div className="custom-modal-container">
          <div className="custom-modal-header">
            <h5>{title}</h5>
            <button
              className="close-btn"
              onClick={onClose}
              style={{ pointerEvents: "none" }}
            >
              ×
            </button>
          </div>

          <div className="custom-modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="e.g. JavaScript"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Level</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)} required>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  value={experience}
                  placeholder="e.g. 2 years / 6 months"
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Visibility</label>
                <select value={visibility} onChange={(e) => setVisibility(e.target.value)} required>
                  <option>Show</option>
                  <option>Hide</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={onClose}
                  style={{ pointerEvents: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-btn"
                  style={{ pointerEvents: "none" }}
                >
                  {saveText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==================
   MAIN SKILLS PAGE
   ================== */
export default function Skills() {
  const staticSkills = [
    { id: 1, name: "React", level: "Advanced", experience: "2 years", visibility: "Show" },
    { id: 2, name: "JavaScript", level: "Advanced", experience: "3 years", visibility: "Show" },
    { id: 3, name: "CSS", level: "Intermediate", experience: "2 years", visibility: "Show" },
    { id: 4, name: "Node.js", level: "Intermediate", experience: "1 year", visibility: "Show" },
    { id: 5, name: "Python", level: "Beginner", experience: "6 months", visibility: "Show" },
    { id: 6, name: "SQL", level: "Advanced", experience: "2 years", visibility: "Show" },
  ];

  const [skills] = useState(staticSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((s) =>
      [s.name, s.level, s.experience, s.visibility].some((val) =>
        (val || "").toString().toLowerCase().includes(q)
      )
    );
  }, [skills, searchTerm]);

  const paginated = filtered.slice(0, rowsPerPage);

  const totalSkills = skills.length;
  const expertCount = skills.filter(
    (s) => (s.level || "").toLowerCase() === "expert"
  ).length;

  const averageExperience = (() => {
    if (!skills.length) return 0;
    const values = skills.map((s) => {
      const str = (s.experience || "").toLowerCase();
      const years = str.match(/([0-9]+(?:\.[0-9]+)?)\s*year/);
      if (years) return parseFloat(years[1]);
      const months = str.match(/([0-9]+)\s*month/);
      if (months) return parseFloat(months[1]) / 12;
      return parseFloat(str) || 0;
    });
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  })();

  return (
    <Layout>
      <section className="skills px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Skills</h2>
            <p className="text-muted">Professional skills overview</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="d-flex gap-3 flex-wrap mb-4">
          <div className="card stat-card text-center">
            <p>Total Skills</p>
            <h3>
              <i className="bi bi-file-earmark-text"></i> {totalSkills}
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Expert Skills</p>
            <h3>
              <i className="bi bi-folder2-open"></i> {expertCount}
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Avg Experience (Years)</p>
            <h3>
              <i className="bi bi-bar-chart"></i> {averageExperience}
            </h3>
          </div>
        </div>

        {/* Management Section */}
        <section className="project-management px-4 py-4">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold project-title">Skill Management</h3>

            {/* STATIC ADD BUTTON */}
            <button
              className="btn btn-primary rounded-pill px-4"
              style={{ pointerEvents: "none" }}
            >
              <i className="fa-solid fa-plus me-2"></i>Add Skill
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-bar mb-4 d-flex align-items-center">
            <i className="fa-solid fa-magnifying-glass me-2"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Skill Name</th>
                  <th>Level</th>
                  <th>Experience</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No skills added yet.
                    </td>
                  </tr>
                ) : (
                  paginated.map((skill, idx) => (
                    <tr key={skill.id}>
                      <td>{idx + 1}</td>
                      <td>{skill.name}</td>

                      <td>
                        <span className="skill-badge" data-level={skill.level}>
                          {skill.level}
                        </span>
                      </td>

                      <td>{skill.experience}</td>

                      <td>
                        <span className={`visibility-badge ${skill.visibility.toLowerCase()}`}>
                          {skill.visibility}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex gap-2">

                          {/* STATIC EDIT BUTTON */}
                          <button
                            className="action-btn edit-btn"
                            style={{ pointerEvents: "none" }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          {/* STATIC DELETE BUTTON */}
                          <button
                            className="action-btn delete-btn"
                            style={{ pointerEvents: "none" }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="table-pagination">
            <button
              className="page-btn"
              style={{ pointerEvents: "none" }}
            >
              &lt;
            </button>

            <span className="current-page">1</span>

            <button
              className="page-btn"
              style={{ pointerEvents: "none" }}
            >
              &gt;
            </button>
          </div>

        </section>
      </section>
    </Layout>
  );
}
