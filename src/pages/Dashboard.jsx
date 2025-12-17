import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/dashboard.css";
import AddProjectModal from "../components/AddProjectModal";

const DEFAULT_PROJECTS = [
  { title: "Portfolio Website", status: "completed", category: "Web" },
  { title: "Mobile App", status: "ongoing", category: "Mobile" },
  { title: "Blog CMS", status: "completed", category: "Web" },
  { title: "Marketing Campaign", status: "ongoing", category: "Marketing" },
];

const Dashboard = () => {
  // Projects persisted in localStorage (shared with Project page)
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || DEFAULT_PROJECTS;
  });

  // Recent activity persisted too
  const [recentActivity, setRecentActivity] = useState(() => {
    return JSON.parse(localStorage.getItem("recentActivity")) || [];
  });

  // Aggregated counts & percentages
  const [stats, setStats] = useState({ total: 0, ongoing: 0, completed: 0 });
  const [percentages, setPercentages] = useState({ completed: 0, inProgress: 0 });

  const [showModal, setShowModal] = useState(false);

  // keep localStorage in sync whenever projects change (Dashboard writes when it adds)
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // recompute stats/percentages whenever projects change
  useEffect(() => {
    const total = projects.length;
    const ongoing = projects.filter((p) => (p.status || "").toLowerCase() === "ongoing").length;
    const completed = projects.filter((p) => (p.status || "").toLowerCase() === "completed").length;

    setStats({ total, ongoing, completed });

    const completedPercent = total ? Math.round((completed / total) * 100) : 0;
    const inProgressPercent = total ? Math.round((ongoing / total) * 100) : 0;
    setPercentages({ completed: completedPercent, inProgress: inProgressPercent });
  }, [projects]);

  // sync when other tabs update localStorage (keeps Dashboard + Project page in sync)
  useEffect(() => {
    const storageHandler = (e) => {
      if (e.key === "projects") {
        try {
          setProjects(JSON.parse(e.newValue) || []);
        } catch {
          setProjects([]);
        }
      } else if (e.key === "recentActivity") {
        try {
          setRecentActivity(JSON.parse(e.newValue) || []);
        } catch {
          setRecentActivity([]);
        }
      }
    };

    // custom event handlers for same-tab updates
    const projectsChangedHandler = (e) => {
      if (e?.detail) setProjects(e.detail);
    };
    const recentActivityChangedHandler = (e) => {
      if (e?.detail) setRecentActivity(e.detail);
    };

    window.addEventListener("storage", storageHandler);
    window.addEventListener("projectsChanged", projectsChangedHandler);
    window.addEventListener("recentActivityChanged", recentActivityChangedHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("projectsChanged", projectsChangedHandler);
      window.removeEventListener("recentActivityChanged", recentActivityChangedHandler);
    };
  }, []);

  // helper to add recent activity and persist it (Dashboard-created projects will also use this)
  const addActivity = (message) => {
    const newEntry = { message, timestamp: Date.now() };
    setRecentActivity((prev) => {
      const updated = [newEntry, ...prev].slice(0, 10);
      localStorage.setItem("recentActivity", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("recentActivityChanged", { detail: updated }));
      return updated;
    });
  };

  // normalize incoming project from AddProjectModal before saving
  const normalizeProject = (p) => {
    const status = (p.status || "").toLowerCase();
    const normalizedStatus =
      status === "completed" ? "completed" : status === "ongoing" ? "ongoing" : p.status || "ongoing";
    return {
      title: p.title || "Untitled",
      status: normalizedStatus,
      category: p.category || "Web",
      description: p.description || "",
    };
  };

  // handle add from modal
  const handleSaveFromModal = (proj) => {
    const normalized = normalizeProject(proj);
    setProjects((prev) => {
      const updated = [...prev, normalized];
      localStorage.setItem("projects", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("projectsChanged", { detail: updated }));
      return updated;
    });
    // add activity and notify
    addActivity(`Added project: ${normalized.title}`);
    setShowModal(false);
  };

  // Project by Category counts (simple mapping similar to previous logic)
  const getCategoryCounts = () => {
    const normalize = (s) => (s || "").trim().toLowerCase();
    const mapCategory = {
      web: "Web",
      "web development": "Web",
      website: "Web",
      mobile: "Mobile",
      "mobile app": "Mobile",
      app: "Mobile",
      marketing: "Marketing",
      "marketing campaign": "Marketing",
      campaign: "Marketing",
      research: "Research",
      study: "Research",
      analysis: "Research",
    };
    const counts = { Web: 0, Mobile: 0, Marketing: 0, Research: 0 };
    projects.forEach((p) => {
      const mapped = mapCategory[normalize(p.category)];
      if (mapped) counts[mapped] = (counts[mapped] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <Layout>
      {showModal && <AddProjectModal onClose={() => setShowModal(false)} onSave={handleSaveFromModal} />}

      <section className="dashboard px-4 py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Dashboard</h2>
            <p className="text-muted">Welcome Back, Admin!</p>
          </div>

          <button className="btn btn-primary rounded-pill px-4" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-plus me-2"></i>Add Project
          </button>
        </div>

        {/* Summary (styled like Project.jsx) */}
        <div className="d-flex gap-3 flex-wrap mb-4">
          <div className="card stat-card text-center">
            <p>Total Projects</p>
            <h3>
              <i className="bi bi-file-earmark-text"></i>{" "}
              <span id="totalProjects">{stats.total}</span>
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Ongoing Projects</p>
            <h3>
              <i className="bi bi-clipboard2"></i>{" "}
              <span id="ongoingProjects">{stats.ongoing}</span>
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Completed Projects</p>
            <h3>
              <i className="bi bi-clipboard-check"></i>{" "}
              <span id="completedProjects">{stats.completed}</span>
            </h3>
          </div>
        </div>

        {/* Projects & Deadlines */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="card project-card flex-grow-1" id="latestProjectCard">
            <p className="last-updated small text-light opacity-75">Last Updated: {new Date().toLocaleDateString()}</p>
            <h5>Portfolio Website</h5>
            <p className="text-light small">Status: Completed</p>
            <p className="small">
              A portfolio site showcasing skills, projects, and achievements with a clean layout, developed with PHP
              Laravel and Next.js.
            </p>
          </div>

          <div className="card deadline-card flex-grow-1">
            <h5>Upcoming Deadlines</h5>
            <ul className="list-unstyled mt-3 small">
              <li className="d-flex justify-content-between">
                <span>Mobile App</span>
                <span>Sept 25, 2025</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Blog CMS</span>
                <span>Oct 3, 2025</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Portfolio Redesign</span>
                <span>Oct 15, 2025</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Analytics */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          {/* Project Status: SVG donuts (same style you used) */}
          <div className="card analytics-card flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Project Status</h5>
              <i className="bi bi-three-dots-vertical fs-5 text-muted" style={{ cursor: "pointer" }} />
            </div>

            <div className="pcircle d-flex justify-content-around align-items-center">
              {/* Completed */}
              <div className="text-center">
                <div className="circular-chart" style={{ width: 120 }}>
                  <svg viewBox="0 0 36 36" className="circular">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray={`${percentages.completed}, 100`}
                      d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {percentages.completed}%
                    </text>
                  </svg>
                </div>
                <p className="mt-2 fw-semibold text-dark">Completed</p>
              </div>

              {/* In Progress */}
              <div className="text-center">
                <div className="circular-chart" style={{ width: 120 }}>
                  <svg viewBox="0 0 36 36" className="circular">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle circle-progress"
                      strokeDasharray={`${percentages.inProgress}, 100`}
                      d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {percentages.inProgress}%
                    </text>
                  </svg>
                </div>
                <p className="mt-2 fw-semibold text-dark">In Progress</p>
              </div>
            </div>
          </div>

          {/* Project by Category (static bar-like layout uses CSS) */}
          <div className="card analytics-card flex-grow-1 category-chart-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Project by Category</h5>
              <i className="bi bi-three-dots-vertical fs-5 text-muted" />
            </div>

            <div className="static-bar-chart">
              <div className="y-grid">
                <span>10</span>
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
                <span>0</span>
              </div>

              <div className="bars" aria-hidden>
                <div
                  className="bar bar-web"
                  style={{ height: `${Math.min(120, (categoryCounts.Web / Math.max(1, stats.total)) * 120)}px` }}
                />
                <div
                  className="bar bar-mobile"
                  style={{ height: `${Math.min(120, (categoryCounts.Mobile / Math.max(1, stats.total)) * 120)}px` }}
                />
                <div
                  className="bar bar-marketing"
                  style={{ height: `${Math.min(120, (categoryCounts.Marketing / Math.max(1, stats.total)) * 120)}px` }}
                />
                <div
                  className="bar bar-research"
                  style={{ height: `${Math.min(120, (categoryCounts.Research / Math.max(1, stats.total)) * 120)}px` }}
                />
              </div>

              <div className="labels">
                <span>Web</span>
                <span>Mobile</span>
                <span>Marketing</span>
                <span>Research</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card recent-activity mt-4">
          <h5 className="fw-bold mb-3">Recent Activity</h5>
          <ul className="list-unstyled mb-0">
            {recentActivity.length === 0 && <li className="text-muted small">No activity yet.</li>}

            {recentActivity.map((item, index) => (
              <li key={index} className="py-1 small">
                <span className="fw-semibold">{item.message}</span>
                <br />
                <span className="text-muted">{new Date(item.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;