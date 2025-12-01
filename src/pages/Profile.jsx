import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/Profile.css";
import "../styles/modals.css";
import { 
  CheckCircleFill, 
  Building, 
  Globe, 
  Calendar, 
  PencilSquare, 
  PersonCircle 
} from "react-bootstrap-icons";

const Profile = () => {
  // Default user data
  const defaultUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corporation",
    website: "www.acme.com",
    mrr: "$12,500",
    role: "Administrator",
    type: "Enterprise",
    createDate: "Jan 15, 2024",
    assignee: "Sarah Johnson",
    source: "Website",
    status: ["Active", "Paid"]
  };

  // Load user data from localStorage or use default
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("profileData");
    return stored ? JSON.parse(stored) : defaultUserData;
  });

  // Modal state
  const [showEditModal, setShowEditModal] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    mrr: "",
    role: "",
    type: "",
    assignee: "",
    source: ""
  });

  // Save to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(userData));
  }, [userData]);

  // Open edit modal and populate form
  const handleEditClick = () => {
    // Extract numeric value from MRR (remove $ and all commas)
    const mrrValue = userData.mrr ? userData.mrr.replace(/\$|,/g, "") : "";
    
    setEditForm({
      name: userData.name,
      email: userData.email,
      company: userData.company,
      website: userData.website,
      mrr: mrrValue,
      role: userData.role,
      type: userData.type,
      assignee: userData.assignee,
      source: userData.source
    });
    setShowEditModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Format MRR with $ and comma
    const formattedMrr = editForm.mrr 
      ? `$${parseFloat(editForm.mrr).toLocaleString()}`
      : userData.mrr;

    // Update user data
    setUserData({
      ...userData,
      name: editForm.name,
      email: editForm.email,
      company: editForm.company,
      website: editForm.website,
      mrr: formattedMrr,
      role: editForm.role,
      type: editForm.type,
      assignee: editForm.assignee,
      source: editForm.source
    });

    setShowEditModal(false);
    alert("Profile updated successfully!");
  };

  return (
    <Layout>
      {/* Edit Profile Modal */}
      {showEditModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content profile-edit-modal">
                <div className="modal-header profile-modal-header">
                  <div className="profile-modal-title-wrapper">
                    <PencilSquare className="profile-modal-icon" />
                    <h5 className="modal-title">Edit Profile Information</h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close profile-close-btn"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSaveProfile}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={editForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company"
                          value={editForm.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Website</label>
                        <input
                          type="text"
                          className="form-control"
                          name="website"
                          value={editForm.website}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">MRR (Monthly Recurring Revenue)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="mrr"
                          value={editForm.mrr}
                          onChange={handleInputChange}
                          placeholder="12500"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Role</label>
                        <input
                          type="text"
                          className="form-control"
                          name="role"
                          value={editForm.role}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Type</label>
                        <select
                          className="form-select"
                          name="type"
                          value={editForm.type}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Enterprise">Enterprise</option>
                          <option value="Professional">Professional</option>
                          <option value="Basic">Basic</option>
                          <option value="Free">Free</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Assignee</label>
                        <input
                          type="text"
                          className="form-control"
                          name="assignee"
                          value={editForm.assignee}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Source</label>
                        <select
                          className="form-select"
                          name="source"
                          value={editForm.source}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Website">Website</option>
                          <option value="Referral">Referral</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer profile-modal-footer">
                    <button
                      type="button"
                      className="btn profile-cancel-btn"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn profile-save-btn">
                      <CheckCircleFill style={{ marginRight: "8px" }} />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}

      <div className="profile-container">
        <div className="profile-card-wrapper">
          {/* Header with Edit Button */}
          <div className="profile-header-actions">
            <h2 className="profile-page-title">Profile Overview</h2>
            <button
              className="profile-edit-btn"
              onClick={handleEditClick}
            >
              <PencilSquare className="edit-icon" />
              <span>Edit Profile</span>
            </button>
          </div>
          {/* Profile Card Container */}
          <div className="profile-card">
            {/* Light Beige Header */}
            <div className="profile-header">
              {/* Circular Avatar */}
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                {/* Verified Badge */}
                <div className="profile-verified-badge">
                  <CheckCircleFill className="verified-icon" />
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="profile-content">
              {/* User Name and Email */}
              <div className="profile-user-info">
                <div className="profile-name-wrapper">
                  <h1 className="profile-name">{userData.name}</h1>
                  <CheckCircleFill className="profile-verified-icon" />
                </div>
                <p className="profile-email">{userData.email}</p>
              </div>

              {/* Status Tags */}
              <div className="profile-status-tags">
                {userData.status.map((status, index) => (
                  <span
                    key={index}
                    className={`profile-status-tag ${
                      status === "Active" ? "status-active" : "status-paid"
                    }`}
                  >
                    {status}
                  </span>
                ))}
              </div>

              {/* Two-Column Field List */}
              <div className="profile-fields">
                {/* Company */}
                <div className="profile-field">
                  <div className="profile-field-label">Company</div>
                  <div className="profile-field-value">
                    <Building className="profile-field-icon" />
                    <span>{userData.company}</span>
                  </div>
                </div>

                {/* Website */}
                <div className="profile-field">
                  <div className="profile-field-label">Website</div>
                  <div className="profile-field-value">
                    <Globe className="profile-field-icon" />
                    <span className="profile-link">{userData.website}</span>
                  </div>
                </div>

                {/* MRR */}
                <div className="profile-field">
                  <div className="profile-field-label">MRR</div>
                  <div className="profile-field-value profile-field-bold">
                    {userData.mrr}
                  </div>
                </div>

                {/* Role */}
                <div className="profile-field">
                  <div className="profile-field-label">Role</div>
                  <div className="profile-field-value">{userData.role}</div>
                </div>

                {/* Type */}
                <div className="profile-field">
                  <div className="profile-field-label">Type</div>
                  <div className="profile-field-value">{userData.type}</div>
                </div>

                {/* Create Date */}
                <div className="profile-field">
                  <div className="profile-field-label">Create Date</div>
                  <div className="profile-field-value">
                    <Calendar className="profile-field-icon" />
                    <span>{userData.createDate}</span>
                  </div>
                </div>

                {/* Assignee */}
                <div className="profile-field">
                  <div className="profile-field-label">Assignee</div>
                  <div className="profile-field-value">
                    <PersonCircle className="profile-field-icon" />
                    <span>{userData.assignee}</span>
                  </div>
                </div>

                {/* Source */}
                <div className="profile-field profile-field-last">
                  <div className="profile-field-label">Source</div>
                  <div className="profile-field-value">
                    <PencilSquare className="profile-field-icon" />
                    <span>{userData.source}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
