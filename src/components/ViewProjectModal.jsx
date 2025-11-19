//viewprojectmodal.jsx
import React from "react";
import "../styles/modals.css";

export default function ViewProjectModal({ show, onClose, project }) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show" id="viewProjectModal" tabIndex="-1" style={{ display: "block" }} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content custom-view-modal p-4">
            <button type="button" className="btn-close ms-auto" onClick={onClose} aria-label="Close"></button>

            <h4 className="fw-bold mb-4 text-darkblue">View Project</h4>

            <div className="mb-3">
              <h6 className="fw-semibold text-darkblue mb-1">Title</h6>
              <p id="viewProjectTitle" className="text-darkblue fs-6 mb-3">
                {project?.title || "—"}
              </p>
            </div>

            <div className="mb-3">
              <h6 className="fw-semibold text-darkblue mb-1">Status</h6>
              <p id="viewProjectStatus" className="text-darkblue fs-6 mb-3">
                {project?.status || "—"}
              </p>
            </div>

            <div>
              <h6 className="fw-semibold text-darkblue mb-1">Description</h6>
              <p id="viewProjectDescription" className="text-darkblue fs-6 lh-base">
                {project?.description || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop show" style={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.3)" }} />
    </>
  );
}
