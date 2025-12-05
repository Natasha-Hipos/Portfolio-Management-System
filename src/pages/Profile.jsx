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

  // Sample posts/activities
  const posts = [
    {
      id: 1,
      title: "New Project Launch",
      description: "Just launched my latest portfolio website",
      time: "2h ago",
      type: "project",
    },
    {
      id: 2,
      title: "Design Inspiration",
      description: "Sharing some UI/UX design tips",
      time: "5h ago",
      type: "post",
    },
    {
      id: 3,
      title: "Workshop Completed",
      description: "Finished the React workshop series",
      time: "1d ago",
      type: "achievement",
    },
    {
      id: 4,
      title: "New Collaboration",
      description: "Working on an exciting new project",
      time: "2d ago",
      type: "project",
    },
    {
      id: 5,
      title: "Article Published",
      description: "My latest article on design systems",
      time: "3d ago",
      type: "post",
    },
  ];

  return (
    <Layout>
      <div className="profile-page">
      <div className="profile-header-section">
        {/* Avatar */}
        <div className="profile-avatar-container">
          <div className="profile-avatar-circle">
            {userData.avatar}
          </div>
        </div>

        {/* User Info */}
        <div className="profile-user-info">
          <h1 className="profile-user-name">{userData.name}</h1>
          <p className="profile-user-handle">{userData.handle}</p>
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

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="profile-stat-item">
            <div className="profile-stat-number">{userData.stats.posts}</div>
            <div className="profile-stat-label">Posts</div>
          </div>
          <div className="profile-stat-item">
            <div className="profile-stat-number">{userData.stats.followers}</div>
            <div className="profile-stat-label">Followers</div>
          </div>
          <div className="profile-stat-item">
            <div className="profile-stat-number">{userData.stats.following}</div>
            <div className="profile-stat-label">Following</div>
          </div>
        </div>
      </div>

      {/* Posts/Activities Section */}
      <div className="profile-content-section">
        <h2 className="profile-section-title">Recent Activity</h2>
        <div className="profile-posts-list">
          {posts.map((post) => (
            <div key={post.id} className="profile-post-card">
              <div className="profile-post-icon">
                {post.type === "project" && <i className="bi bi-folder"></i>}
                {post.type === "post" && <i className="bi bi-file-text"></i>}
                {post.type === "achievement" && <i className="bi bi-trophy"></i>}
              </div>
              <div className="profile-post-content">
                <h3 className="profile-post-title">{post.title}</h3>
                <p className="profile-post-description">{post.description}</p>
                <span className="profile-post-time">{post.time}</span>
              </div>
              <div className="profile-post-arrow">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;

