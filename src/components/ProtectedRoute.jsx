// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// Dummy auth check - replace this with your actual logic
const isAuthenticated = () => {
  // For example, check for a token in localStorage
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
