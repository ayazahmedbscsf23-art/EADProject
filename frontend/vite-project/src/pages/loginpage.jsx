import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { API } from "../services/api";
import FormInput from "../components/FormInput";

export default function LoginPage() {
  const { login } = useAuth();
  const addToast = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState("login");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (tab === "login") {
        const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const data = await res.json();
        if (!res.ok) return addToast(data.message || "Login failed", "error");
        login(data);
        addToast(`Welcome back, ${data.name}!`, "success");
        navigate("/");
      } else {
        const res = await fetch(`${API}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role }),
        });
        const data = await res.json();
        if (!res.ok) return addToast(data.message || "Registration failed", "error");
        addToast("Account created! Please sign in.", "success");
        setTab("login");
      }
    } catch {
      addToast("Cannot connect to server. Is backend running?", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>🎓 EduLearn LMS</h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["login", "register"].map((t) => (
            <button key={t} className={`btn ${tab === t ? "btn-primary" : "btn-ghost"}`}
              style={{ flex: 1 }} onClick={() => setTab(t)}>
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {tab === "register" && (
          <>
            <FormInput label="Full Name" value={form.name} onChange={set("name")} placeholder="Ali Hassan" />
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {["student", "teacher"].map((r) => (
                <button key={r} className={`btn ${role === r ? "btn-primary" : "btn-ghost"}`}
                  style={{ flex: 1 }} onClick={() => setRole(r)}>
                  {r === "student" ? "👤 Student" : "👨‍🏫 Teacher"}
                </button>
              ))}
            </div>
          </>
        )}

        <FormInput label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        <FormInput label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Min 6 characters" />

        <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}