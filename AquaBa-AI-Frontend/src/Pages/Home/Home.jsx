import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";

// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import ForgotPassword from "./components/ForgotPassword";
import ForgotPassword from "../ForgetPassword/ForgetPassword"
import Register from "../Register/Register"
import Dashboard from "../Dashboard/Dashboard"
import ResetPassword from "../ResetPassword/ResetPassword";
import Inventory from "../Inventory/Inventory";
// import ResetPassword from "./components/ResetPassword";

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

function Home() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/inventory" element={<Inventory/>} />

      <Route
        path="/dashboard"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default Home;