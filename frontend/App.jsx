import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const API = "http://localhost:5000/api";


function Toast({ toasts }) {
  return (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 10
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "error" ? "#ff5e5e" :
                     t.type === "warn" ? "#ffb347" : "#00d4aa",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 8
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── Protected Route ─────────────────────
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

// ─── Login Page ──────────────────────────
function LoginPage({ addToast, login }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) return addToast(data.message || "Login failed", "error");

      login(data);
      addToast("Login successful", "success");
    } catch {
      addToast("Server error", "error");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// ─── Dashboard ───────────────────────────
function Dashboard() {
  return <h2 style={{ padding: 20 }}>📊 Dashboard Page</h2>;
}

// ─── Courses ─────────────────────────────
function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${API}/courses`)
      .then(r => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📚 Courses</h2>

      {courses.map(c => (
        <div key={c._id} style={{
          padding: 10,
          margin: 10,
          border: "1px solid #ccc"
        }}>
          <h4>{c.title}</h4>
          <p>{c.category}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Course Detail ───────────────────────
function CourseDetail() {
  return <h2 style={{ padding: 20 }}>🎥 Course Detail Page</h2>;
}

// ─── Layout (Sidebar replacement optional) ─
function Layout({ logout }) {
  return (
    <div>
      <nav style={{
        display: "flex",
        gap: 20,
        padding: 10,
        background: "#222",
        color: "#fff"
      }}>
        <a href="/">Dashboard</a>
        <a href="/courses">Courses</a>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const login = (u) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <Toast toasts={toasts} />

        {user && <Layout logout={logout} />}

        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={<LoginPage addToast={addToast} login={login} />}
          />

          {/* Protected */}
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <PrivateRoute user={user}>
                <Courses />
              </PrivateRoute>
            }
          />

          <Route
            path="/course/:id"
            element={
              <PrivateRoute user={user}>
                <CourseDetail />
              </PrivateRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}