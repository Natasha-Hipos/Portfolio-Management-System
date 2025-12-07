// src/pages/Experience.jsx
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import DeleteModal from "../components/DeleteModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/experience.css";

const rowsPerPage = 5;

/* =================================================
 CLEAN MODAL (ADD / EDIT EXPERIENCE)
================================================= */
function ExperienceFormModal({ show, mode = "add", initial = {}, onClose, onSave }) {
  const [role, setRole] = useState(initial.role || "");
  const [company, setCompany] = useState(initial.company || "");
  const [type, setType] = useState(initial.type || "Internship");
  const [duration, setDuration] = useState(initial.duration || "");

  useEffect(() => {
    if (show) {
      setRole(initial.role || "");
      setCompany(initial.company || "");
      setType(initial.type || "Internship");
      setDuration(initial.duration || "");
    }
  }, [show, initial]);

  if (!show) return null;

  const title = mode === "edit" ? "Edit Experience" : "Add Experience";
  const saveText = mode === "edit" ? "Update" : "Add Experience";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role.trim() || !company.trim() || !type.trim() || !duration.trim()) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    onSave({
      id: initial.id || null,
      role: role.trim(),
      company: company.trim(),
      type: type.trim(),
      duration: duration.trim(),
    });

    onClose();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h5>{title}</h5>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="custom-modal-body">

            <div className="form-group">
              <label>Role / Position</label>
              <input
                type="text"
                placeholder="e.g., Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Company / Organization</label>
              <input
                type="text"
                placeholder="e.g., ABC Technologies Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Type</label>

              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Professional</option>
                <option>Academic</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                placeholder="e.g. Jan 2023 - May 2023"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              {saveText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =================================================
   MAIN EXPERIENCE PAGE
================================================= */
export default function Experience() {
  const typeClass = (type) =>
    `type-badge type-${type.toLowerCase().replace(/\s+/g, "")}`;

  const staticExperiences = [
    { id: 1, role: "Frontend Developer", company: "Tech Corp Inc.", type: "Professional", duration: "Jan 2023 - Present" },
    { id: 2, role: "Junior Developer", company: "Web Solutions Ltd.", type: "Professional", duration: "Jun 2022 - Dec 2022" },
    { id: 3, role: "Intern Developer", company: "StartUp XYZ", type: "Internship", duration: "Jan 2022 - May 2022" },
    { id: 4, role: "Freelance Developer", company: "Self-Employed", type: "Freelance", duration: "Aug 2021 - Dec 2021" },
  ];

  const [experiences, setExperiences] = useState(staticExperiences);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedExp, setSelectedExp] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(experiences.length / rowsPerPage));
    if (currentPage > pages) setCurrentPage(pages);
  }, [experiences, currentPage]);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return experiences;
    return experiences.filter((exp) =>
      [exp.role, exp.company, exp.type, exp.duration].some((val) =>
        (val || "").toLowerCase().includes(q)
      )
    );
  }, [experiences, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage]);

  const total = experiences.length;
  const currentRole = total > 0 ? experiences[experiences.length - 1].role : "None";

  const yearsExperience = useMemo(() => {
    if (!experiences.length) return 0;

    const parse = (str) => {
      if (!str) return null;
      const [m, y] = str.split(" ");
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const idx = months.indexOf(m);
      if (idx === -1 || isNaN(Number(y))) return null;
      return new Date(Number(y), idx, 1);
    };

    let totalMonths = 0;

    experiences.forEach((exp) => {
      const [startStr, endStr] = (exp.duration || "").split(" - ");
      const start = parse(startStr);
      const end = parse(endStr);
      if (start && end) {
        totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      }
    });

    return Math.round((totalMonths / 12) * 10) / 10;
  }, [experiences]);

  /* Disable adding/editing/deleting */
  const openAdd = () => {};
  const openEdit = () => {};
  const openDelete = () => {};
  const handleSave = () => {};

  const goPrev = () => {};
  const goNext = () => {};

  return (
    <Layout>
      <ExperienceFormModal
        show={showForm}
        mode={formMode}
        initial={selectedExp || {}}
        onClose={() => {
          setShowForm(false);
          setSelectedExp(null);
        }}
        onSave={handleSave}
      />

      <DeleteModal
        show={showDelete}
        onClose={() => {
          setShowDelete(false);
          setSelectedToDelete(null);
        }}
        onConfirm={() => {}}
        itemName="experience"
      />

      <section className="experience px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Experience</h2>
            <p className="text-muted">Manage your professional and internship experiences</p>
          </div>
        </div>

        <div className="d-flex gap-3 flex-wrap mb-4">
          <div className="card stat-card text-center">
            <p>Total Experience</p>
            <h3><i className="bi bi-file-earmark-text"></i> {total}</h3>
          </div>

          <div className="card stat-card text-center">
            <p>Current Role</p>
            <h3><i className="bi bi-folder2-open"></i> {currentRole}</h3>
          </div>

          <div className="card stat-card text-center">
            <p>Years of Experience</p>
            <h3><i className="bi bi-clock-history"></i> {yearsExperience} Years</h3>
          </div>
        </div>

        <section className="experience-management px-4 py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">Experience Management</h3>

            {/* STATIC ADD BUTTON */}
            <button
              className="btn btn-primary rounded-pill px-4"
              style={{ pointerEvents: "none" }}
            >
              <i className="fa-solid fa-plus me-2"></i>Add Experience
            </button>
          </div>

          <div className="search-bar mb-4">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="table-responsive mt-4">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Role/Position</th>
                  <th>Company/Org</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No experiences available.
                    </td>
                  </tr>
                ) : (
                  paginated.map((exp, idx) => (
                    <tr key={exp.id}>
                      <td>{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                      <td>{exp.role}</td>
                      <td>{exp.company}</td>
                      <td>
                        <span className={typeClass(exp.type)}>
                          {exp.type}
                        </span>
                      </td>
                      <td>{exp.duration}</td>
                      <td>
                        <div className="d-flex gap-2">

                          {/* STATIC EDIT BUTTON */}
                          <button
                            className="action-btn"
                            title="Edit"
                            style={{ pointerEvents: "none" }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          {/* STATIC DELETE BUTTON */}
                          <button
                            className="action-btn"
                            title="Delete"
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

          <div className="table-pagination">

            {/* STATIC PAGINATION BUTTONS */}
            <button className="page-btn" style={{ pointerEvents: "none" }}>
              &lt;
            </button>

            <span className="current-page">{currentPage}</span>

            <button className="page-btn" style={{ pointerEvents: "none" }}>
              &gt;
            </button>
          </div>
        </section>
      </section>
    </Layout>
  );
}
