import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/courses`).then(r => r.json()).then(setCourses).catch(console.error);
  }, []);

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content">
      <h2>📚 Courses</h2>
      <input className="input" placeholder="Search courses…"
        style={{ marginBottom: 16 }} onChange={e => setSearch(e.target.value)} />
      <div className="grid-3">
        {filtered.map(c => (
          <div key={c._id} className="card" style={{ cursor: "pointer" }}
            onClick={() => navigate(`/course/${c._id}`, { state: { course: c } })}>
            <h3>{c.title}</h3>
            <p style={{ color: "#9ca3c8", marginTop: 6 }}>{c.teacher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}