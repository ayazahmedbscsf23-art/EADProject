import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname;

  const navItems = [
    { path: "/", icon: "", label: "Dashboard" },
    { path: "/courses", icon: "📚", label: "Courses" },
    ...(user?.role === "teacher" ? [{ path: "/manage", icon: "🛠️", label: "Manage Courses" }] : []),
  ];

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo-icon">🎓</div>
        <div className="logo-text">EduLearn</div>
      </div>
      <div className="nav-section">
        <div className="nav-label">Navigation</div>
        {navItems.map(item => (
          <div key={item.path}
            className={`nav-item ${page === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}>
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div style={{ marginBottom: 10, fontWeight: 600 }}>{user?.name}</div>
        <div style={{ fontSize: 12, color: "#6b7298", marginBottom: 12 }}>{user?.role}</div>
        <button className="btn btn-ghost" style={{ width: "100%" }}
          onClick={() => { logout(); navigate("/login"); }}>Logout</button>
      </div>
    </aside>
  );
}