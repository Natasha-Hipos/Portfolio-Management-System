import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import "../styles/dashboard.css";
import Chart from "chart.js/auto";
import AddProjectModal from "../components/AddProjectModal";

const Dashboard = () => {
  const [projects, setProjects] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("projects")) || [
        { title: "Portfolio Website", status: "completed", category: "Web" },
        { title: "Mobile App", status: "ongoing", category: "Mobile" },
        { title: "Blog CMS", status: "completed", category: "Web" },
        { title: "Marketing Campaign", status: "ongoing", category: "Marketing" },
      ]
    );
  });

  const [recentActivity, setRecentActivity] = useState(() => {
    return JSON.parse(localStorage.getItem("recentActivity")) || [];
  });

  const addActivity = (message) => {
    const newEntry = {
      message,
      timestamp: Date.now(),
    };

    setRecentActivity((prev) => {
      const updated = [newEntry, ...prev].slice(0, 10);
      localStorage.setItem("recentActivity", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
  const syncActivity = () => {
    const stored = JSON.parse(localStorage.getItem("recentActivity")) || [];
    setRecentActivity(stored);
  };

  window.addEventListener("storage", syncActivity);
  return () => window.removeEventListener("storage", syncActivity);
  }, []);

  const [stats, setStats] = useState({
    total: 0,
    ongoing: 0,
    completed: 0,
  });

  const [percentages, setPercentages] = useState({
    completed: 0,
    inProgress: 0,
  });

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const total = projects.length;
    const ongoing = projects.filter((p) => p.status === "ongoing").length;
    const completed = projects.filter((p) => p.status === "completed").length;

    setStats({ total, ongoing, completed });

    const completedPercent = total ? Math.round((completed / total) * 100) : 0;
    const inProgressPercent = total ? Math.round((ongoing / total) * 100) : 0;

    setPercentages({ completed: completedPercent, inProgress: inProgressPercent });
  }, [projects]);

  // Project Categories
  useEffect(() => {
    if (!chartRef.current) return;

    const normalize = (str) => str?.trim().toLowerCase();

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

    const categoryCounts = {};

    projects.forEach((p) => {
      const raw = normalize(p.category);
      const mapped = mapCategory[raw];

      if (mapped) {
        categoryCounts[mapped] = (categoryCounts[mapped] || 0) + 1;
      }
    });

    const defaultCategories = ["Web", "Mobile", "Marketing", "Research"];
    const data = defaultCategories.map((cat) => categoryCounts[cat] || 0);

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: defaultCategories,
        datasets: [
          {
            label: "",
            data,
            backgroundColor: ["#2F4A83", "#90A9D6", "#7B94C2", "#AFC3E6"],
            borderRadius: 10,
            barThickness: 35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        layout: { padding: { top: 10, left: 0, right: 0, bottom: 5 } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { display: false },
            grid: { color: "#E5E7EB", lineWidth: 1.1 },
            border: { display: false },
          },
          x: {
            ticks: { font: { size: 13 }, color: "#333" },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });
  }, [projects]);

  return (
    <Layout>
      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
         onSave={(proj) => {
          // Update project list
          setProjects((prev) => {
            const updated = [...prev, proj];
            localStorage.setItem("projects", JSON.stringify(updated));
            return updated;
          });
          // Update recent activity
          addActivity(`Added project: ${proj.title}`);

          // Close modal
          setShowModal(false);
        }}
        />
      )}

      <section className="dashboard px-4 py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Dashboard</h2>
            <p className="text-muted">Welcome Back, Admin!</p>
          </div>

          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-plus me-2"></i>Add Project
          </button>
        </div>

        {/* Summary */}
        <div className="d-flex gap-3 flex-wrap mb-4">
          <div className="card stat-card text-center">
            <p>Total Projects</p>
            <h3>
              <i className="bi bi-file-earmark-text"></i> {stats.total}
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Ongoing Projects</p>
            <h3>
              <i className="bi bi-clipboard2"></i> {stats.ongoing}
            </h3>
          </div>

          <div className="card stat-card text-center">
            <p>Completed Projects</p>
            <h3>
              <i className="bi bi-clipboard-check"></i> {stats.completed}
            </h3>
          </div>
        </div>

        {/* Projects & Deadlines Section */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          {/* Latest Project */}
          <div className="card project-card flex-grow-1" id="latestProjectCard">
            <p className="last-updated small text-light opacity-75">
              Last Updated: Sept 12, 2025
            </p>
            <h5>Portfolio Website</h5>
            <p className="text-light small">Status: Completed</p>
            <p className="small">
              A portfolio site showcasing skills, projects, and achievements
              with a clean layout, developed with PHP Laravel and Next.js.
            </p>
          </div>

          {/* Deadlines */}
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

          {/* Project Status */}
          <div className="card analytics-card flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Project Status</h5>
              <i
                className="bi bi-three-dots-vertical fs-5 text-muted"
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="pcircle d-flex justify-content-around align-items-center">
              {/* Completed */}
              <div className="text-center">
                <div className="circular-chart">
                  <svg viewBox="0 0 36 36">
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
                <div className="circular-chart">
                  <svg viewBox="0 0 36 36">
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


          {/* Project by Category (Static) */}
          <div className="card analytics-card flex-grow-1 category-chart-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Project by Category</h5>
              <i className="bi bi-three-dots-vertical fs-5 text-muted"></i>
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

              <div className="bars">
                <div className="bar bar-web" data-height="80"></div>
                <div className="bar bar-mobile" data-height="40"></div>
                <div className="bar bar-marketing" data-height="60"></div>
                <div className="bar bar-research" data-height="25"></div>
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
            {recentActivity.length === 0 && (
              <li className="text-muted small">No activity yet.</li>
            )}

            {recentActivity.map((item, index) => (
              <li key={index} className="py-1 small">
                <span className="fw-semibold">{item.message}</span>
                <br />
                <span className="text-muted">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;