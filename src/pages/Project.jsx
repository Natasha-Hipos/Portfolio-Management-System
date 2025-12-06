// src/pages/Project.jsx
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import "../styles/project.css";
import { useNotification } from "../contexts/NotificationContext";

// modal components (located in src/components)
import AddProjectModal from "../components/AddProjectModal";
import ViewProjectModal from "../components/ViewProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import DeleteModal from "../components/DeleteModal";

const rowsPerPage = 5;

const Project = () => {
  const { showNotification } = useNotification();

  // Safe loader to avoid corrupted localStorage or invalid types
  const loadProjects = () => {
    try {
      const raw = localStorage.getItem("projects");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  // Project state
  const [projects, setProjects] = useState(() => loadProjects());

  // UI state for modals
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // selected project for view/edit/delete
  const [selectedProject, setSelectedProject] = useState(null);

  // search + pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //  Fixed loading logic — always loads SAFE array
  useEffect(() => {
    const stored = loadProjects();

    const normalized = stored
      .map((p, idx) => {
        if (!p || typeof p !== "object") return null;
        return p.id ? p : { ...p, id: Date.now() + idx };
      })
      .filter(Boolean);

    // resave normalized data (keeps IDs permanent)
    localStorage.setItem("projects", JSON.stringify(normalized));

    setProjects(normalized);
  }, []);

  // persist projects whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects || []));
    const totalPages = Math.max(1, Math.ceil(projects.length / rowsPerPage));
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [projects, currentPage]);

  // Derived / memoized filtered projects
  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const title = (p.title || "").toString().toLowerCase();
      const status = (p.status || "").toString().toLowerCase();
      const desc = (p.description || "").toString().toLowerCase();
      return title.includes(q) || status.includes(q) || desc.includes(q);
    });
  }, [projects, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / rowsPerPage));

  // Paginated slice for current page
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredProjects.slice(start, start + rowsPerPage);
  }, [filteredProjects, currentPage]);

  // ---------- Add ----------
  const handleOpenAdd = () => setShowAdd(true);

  const handleAddSave = (newProject) => {
    const projectWithId = { ...newProject, id: newProject.id || Date.now() };
    setProjects((prev) => {
      const next = [...prev, projectWithId];
      const pages = Math.max(1, Math.ceil(next.length / rowsPerPage));
      setCurrentPage(pages);
      return next;
    });
    showNotification("Project added successfully", "success");
  };

  // ---------- View ----------
  const handleView = (project) => {
    setSelectedProject(project);
    setShowView(true);
  };

  // ---------- Edit ----------
  const handleOpenEdit = (project) => {
    setSelectedProject(project);
    setShowEdit(true);
  };

  const handleUpdate = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === updatedProject.id ? { ...p, ...updatedProject } : p
      )
    );
    showNotification("Project updated successfully", "success");
  };

  // ---------- Delete ----------
  const handleOpenDelete = (project) => {
    setSelectedProject(project);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.filter((p) => p.id !== selectedProject.id)
    );
    setShowDelete(false);
    setSelectedProject(null);
    showNotification("Project deleted successfully", "success");
  };

  // Helpers for rendering
  const statusClass = (status) =>
    `status-badge status-${(status || "").toLowerCase().replace(/\s+/g, "")}`;

  // Pagination controls
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goToPage = (n) => setCurrentPage(Math.max(1, Math.min(totalPages, n)));

  return (
    <Layout>
      {/* ======== MODALS ======== */}
      {showAdd && (
        <AddProjectModal
          onClose={() => setShowAdd(false)}
          onSave={(proj) => {
            handleAddSave(proj);
            setShowAdd(false);
          }}
        />
      )}

      <ViewProjectModal
        show={showView}
        onClose={() => {
          setShowView(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />

      <EditProjectModal
        show={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedProject(null);
        }}
        onUpdate={(updated) => handleUpdate(updated)}
        project={selectedProject}
      />

     <DeleteModal
        show={showDelete}
        onClose={() => {
          setShowDelete(false);
          setSelectedProject(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={selectedProject?.title || "this project"}
      />


      {/* ======== PAGE CONTENT ======== */}
      <section className="project px-4 py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Project</h2>
            <p className="text-muted">Track and organize your projects</p>
          </div>
        </div>

        {/* Project Summary Cards */}
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
                {projects.filter((p) => p.status === "Ongoing").length}
              </span>
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Completed Projects</p>
            <h3>
              <i className="bi bi-clipboard-check"></i>{" "}
              <span id="completedProjects">
                {projects.filter((p) => p.status === "Completed").length}
              </span>
            </h3>
          </div>
        </div>

        {/* Project Management Section */}
        <section className="project-management px-4 py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold project-title">Project Management</h3>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={handleOpenAdd}
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
            <tbody id="projectTableBody">
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
                          onClick={() => handleOpenEdit(project)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="action-btn"
                          title="Delete"
                          onClick={() => handleOpenDelete(project)}
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
          <button className="page-btn" onClick={goPrev}>&lt;</button>
          <span className="current-page" onClick={() => goToPage(1)}>
            {currentPage}
          </span>
          <button className="page-btn" onClick={goNext}>&gt;</button>
        </div>
      </section>
    </Layout>
  );
};

export default Project;
