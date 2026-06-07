import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { API } from "../services/api";

export default function ManageCourses() {
  const { user } = useAuth();
  const addToast = useToast();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", description: "" });

  const fetchCourses = () =>
    fetch(`${API}/courses`).then(r => r.json()).then(data =>
      setCourses(data.filter(c => c.teacherId === user?._id))
    );

  useEffect(() => { fetchCourses(); }, []);

  const createCourse = async () => {
    if (!form.title || !form.category) return addToast("Title and category required", "error");
    await fetch(`${API}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, teacher: user.name, teacherId: user._id }),
    });
    addToast("Course created!", "success");
    setForm({ title: "", category: "", description: "" });
    fetchCourses();
  };

  return (
    <div className="content">
      <h2>🛠️ Manage Courses</h2>
      <div className="card" style={{ marginBottom: 20 }}>
        <input className="input" placeholder="Course Title *"
          value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <input className="input" placeholder="Category *"
          value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
        <input className="input" placeholder="Description"
          value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <button className="btn btn-primary" onClick={createCourse}>➕ Create Course</button>
      </div>
      {courses.map(c => (
        <div key={c._id} className="card" style={{ marginBottom: 8 }}>
          <strong>{c.title}</strong>
          <span style={{ color: "#9ca3c8", marginLeft: 10, fontSize: 13 }}>{c.category}</span>
        </div>
      ))}
    </div>
  );
}