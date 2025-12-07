import React from "react";
import Layout from "../components/Layout";
import "../styles/Profile.css";

const Profile = () => {
  // Sample user data
  const userData = {
    name: "Christian Macaranas",
    handle: "GalaxyDestroyer@gmail.com",
    bio: "designer & developer.",
    nickname: "Chan",
    stats: {
      posts: 128,
      followers: "1m",
      following: 1,
    },
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <Layout>
      <div className="profile-page">
      <div className="profile-header-section">
        {/* Avatar */}
        <div className="profile-avatar-container">
          <div className="profile-avatar-circle">
            <span className="profile-avatar-initials">{getInitials(userData.name)}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="profile-user-info">
          <div className="profile-name-row">
            <h1 className="profile-user-name">{userData.name}</h1>
            {userData.nickname && (
              <span className="profile-nickname">@{userData.nickname}</span>
            )}
          </div>
          <p className="profile-user-handle">
            <i className="bi bi-envelope"></i>
            {userData.handle}
          </p>
          <p className="profile-user-bio">{userData.bio}</p>
        </div>

        {/* Quick Action Buttons */}
        <div className="profile-action-buttons">
          <button className="profile-action-btn profile-action-btn-primary">
            <i className="bi bi-pencil"></i>
            Edit Profile
          </button>
          <button className="profile-action-btn profile-action-btn-secondary">
            <i className="bi bi-share"></i>
            Share
          </button>
          <button className="profile-action-btn profile-action-btn-secondary">
            <i className="bi bi-chat-dots"></i>
            Message
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;

