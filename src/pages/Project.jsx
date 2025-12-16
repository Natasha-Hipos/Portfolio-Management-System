// src/pages/Project.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "../components/Layout";
import "../styles/project.css";
import { useNotification } from "../contexts/NotificationContext";

// API instance
import API from "../api/axios";

// modal components
import AddProjectModal from "../components/AddProjectModal";
import ViewProjectModal from "../components/ViewProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import DeleteModal from "../components/DeleteModal";

const rowsPerPage = 5;

const Project = () => {
  const { showNotification } = useNotification();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // UI state for modals
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Load projects from API ----------
  const fetchProjects = useCallback(async () => {
    try {
      const res = await API.get("/projects"); // GET /api/projects
      const fetched = res.data.data || [];

      // ensure stable ordering: oldest -> newest (newest at the end)
      fetched.sort((a, b) => (a.id || 0) - (b.id || 0));

      setProjects(fetched);
    } catch (error) {
      console.error("Fetch projects error:", error.response || error);
      showNotification("Failed to load projects", "error");
    }
  }, [showNotification]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ---------- Derived data ----------
  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const status = (p.status || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      return title.includes(q) || status.includes(q) || desc.includes(q);
    });
  }, [projects, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / rowsPerPage));
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredProjects.slice(start, start + rowsPerPage);
  }, [filteredProjects, currentPage]);

  // ---------- Handlers ----------
  // Add
  const handleAddSave = (newProject) => {
    setProjects((prev) => {
      // append the new project at the end
      const updated = [...prev, newProject];

      // keep ordering consistent (oldest -> newest)
      updated.sort((a, b) => (a.id || 0) - (b.id || 0));

      // move to last page so the newly added item is visible
      const lastPage = Math.max(1, Math.ceil(updated.length / rowsPerPage));
      setCurrentPage(lastPage);

      return updated;
    });

    showNotification("Project added successfully", "success");
  };

  // View
  const handleView = (project) => {
    setSelectedProject(project);
    setShowView(true);
  };

  // Edit
  const handleUpdate = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    showNotification("Project updated successfully", "success");
  };

  // Delete
  const handleDeleted = (deletedId) => {
    setProjects((prev) => prev.filter((p) => p.id !== deletedId));
    setSelectedProject(null);
    showNotification("Project deleted successfully", "success");
    setCurrentPage((prev) => Math.min(prev, Math.ceil((projects.length - 1) / rowsPerPage)));
  };

  // Helpers
  const statusClass = (status) =>
    `status-badge status-${(status || "").toLowerCase().replace(/\s+/g, "")}`;

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goToPage = (n) => setCurrentPage(Math.max(1, Math.min(totalPages, n)));

  return (
    <Layout>
      {/* ===== MODALS ===== */}
      {showAdd && (
        <AddProjectModal
          onClose={() => setShowAdd(false)}
          onSave={handleAddSave}
        />
      )}

      {showView && selectedProject && (
        <ViewProjectModal
          show={showView}
          onClose={() => setShowView(false)}
          projectId={selectedProject.id}
        />
      )}

      {showEdit && selectedProject && (
        <EditProjectModal
          show={showEdit}
          onClose={() => setShowEdit(false)}
          project={selectedProject}
          onUpdated={handleUpdate}
        />
      )}

      {showDelete && selectedProject && (
        <DeleteModal
          show={showDelete}
          onClose={() => setShowDelete(false)}
          projectId={selectedProject.id}
          onDeleted={handleDeleted}
        />
      )}

      {/* ===== PAGE CONTENT ===== */}
      <section className="project px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Project</h2>
            <p className="text-muted">Track and organize your projects</p>
          </div>
        </div>

        <div className="d-flex gap-3 flex-wrap mb-4" id="projectSummary">
          <div className="card stat-card text-center">
            <p>Total Projects</p>
            <h3>
              <i className="bi bi-file-earmark-text"></i>{" "}
              <span id="totalProjects">{projects.length}</span>
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Ongoing Projects</p>
            <h3>
              <i className="bi bi-clipboard2"></i>{" "}
              <span id="ongoingProjects">
                {projects.filter((p) => p.status === "ongoing").length}
              </span>
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Completed Projects</p>
            <h3>
              <i className="bi bi-clipboard-check"></i>{" "}
              <span id="completedProjects">
                {projects.filter((p) => p.status === "completed").length}
              </span>
            </h3>
          </div>
        </div>

        {/* Project Management */}
        <section className="project-management px-4 py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold project-title">Project Management</h3>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => setShowAdd(true)}
            >
              <i className="fa-solid fa-plus me-2"></i>Add Project
            </button>
          </div>

          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              id="projectSearch"
              className="form-control"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </section>

        {/* Project Table */}
        <div className="table-responsive mt-4">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No projects found.
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project, index) => (
                  <tr key={project.id ?? index}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{project.title}</td>
                    <td>
                      <span className={statusClass(project.status)}>
                        {project.status}
                      </span>
                    </td>
                    <td className="description">{project.description}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="action-btn"
                          title="View"
                          onClick={() => handleView(project)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                        <button
                          className="action-btn"
                          title="Edit"
                          onClick={() => {
                            setSelectedProject(project);
                            setShowEdit(true);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="action-btn"
                          title="Delete"
                          onClick={() => {
                            setSelectedProject(project);
                            setShowDelete(true);
                          }}
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
          <button className="page-btn" onClick={goPrev}>
            &lt;
          </button>
          <span className="current-page" onClick={() => goToPage(1)}>
            {currentPage}
          </span>
          <button className="page-btn" onClick={goNext}>
            &gt;
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Project;