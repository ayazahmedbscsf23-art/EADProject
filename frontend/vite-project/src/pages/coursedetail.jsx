import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function CourseDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (course?._id)
      fetch(`${API}/videos/${course._id}`).then(r => r.json()).then(setVideos);
  }, [course]);

  if (!course) return <div className="content">Course not found. <button onClick={() => navigate("/courses")}>Go back</button></div>;

  return (
    <div className="content">
      <button className="btn btn-ghost" style={{ marginBottom: 16 }}
        onClick={() => navigate("/courses")}>← Back</button>
      <h2>{course.title}</h2>
      <p style={{ color: "#9ca3c8", marginBottom: 20 }}>{course.description}</p>
      {videos.length === 0
        ? <p style={{ color: "#6b7298" }}>No videos yet.</p>
        : videos.map(v => (
          <div key={v._id} className="card" style={{ marginBottom: 8 }}>
            <h4> {v.title}</h4>
            <p style={{ fontSize: 12, color: "#9ca3c8" }}>{v.duration}</p>
          </div>
        ))}
    </div>
  );
}