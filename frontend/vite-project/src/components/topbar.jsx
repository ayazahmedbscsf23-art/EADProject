import React from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Dashboard",
  "/courses": "Course Catalog",
  "/manage": "Manage Courses",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const title = titles[pathname] || "Course Detail";

  return (
    <div className="topbar">
      <span className="page-title">{title}</span>
      <span style={{ fontSize: 12, color: "#6b7298" }}>{new Date().toDateString()}</span>
    </div>
  );
}