import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/modals.css";

export default function ViewProjectModal({ show, onClose, projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && projectId) {
      setLoading(true);
      API.get(`/projects/${projectId}`)
        .then((res) => setProject(res.data)) // ✅ fixed
        .catch((err) => {
          console.error(err);
          alert("Failed to load project data.");
        })
        .finally(() => setLoading(false));
    }
  }, [show, projectId]);

  if (!show) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content custom-view-modal p-4">
            <button type="button" className="btn-close ms-auto" onClick={onClose} disabled={loading}></button>
            <h4 className="fw-bold mb-4 text-darkblue">View Project</h4>
            {loading ? (
              <p>Loading project details...</p>
            ) : (
              <>
                <div className="mb-3">
                  <h6 className="fw-semibold mb-1">Title</h6>
                  <p>{project?.title || "—"}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-semibold mb-1">Status</h6>
                  <p>{project?.status || "—"}</p>
                </div>
                <div>
                  <h6 className="fw-semibold mb-1">Description</h6>
                  <p>{project?.description || "—"}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" style={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.3)" }} />
    </>
  );
}
