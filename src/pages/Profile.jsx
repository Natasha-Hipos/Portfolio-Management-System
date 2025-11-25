import React from "react";
import Layout from "../components/Layout";
import "../styles/Profile.css";
import { 
  CheckCircleFill, 
  Building, 
  Globe, 
  Calendar, 
  PencilSquare, 
  PersonCircle 
} from "react-bootstrap-icons";

const Profile = () => {
  // Sample user data - replace with actual data from props or state
  const userData = {
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

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card-wrapper">
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
