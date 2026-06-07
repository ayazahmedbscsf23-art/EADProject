import React, { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`${API}/stats`)
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="content">
      <h2>Dashboard</h2>

      <div className="grid-4">
        <div className="card">Courses: {stats.courses}</div>
        <div className="card">Videos: {stats.videos}</div>
        <div className="card">Users: {stats.users}</div>
        <div className="card">Quizzes: {stats.quizzes}</div>
      </div>
    </div>
  );
}