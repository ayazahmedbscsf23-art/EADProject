import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import ManageCourses from "./pages/ManageCourses";
import CourseDetail from "./pages/CourseDetail";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        {children}
      </div>
    </div>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <Layout>
              <Courses />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/manage"
        element={
          <PrivateRoute>
            <Layout>
              <ManageCourses />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/course/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CourseDetail />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}