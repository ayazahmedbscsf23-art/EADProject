import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        Access denied. Please login first.
      </div>
    );
  }

  return children;
}