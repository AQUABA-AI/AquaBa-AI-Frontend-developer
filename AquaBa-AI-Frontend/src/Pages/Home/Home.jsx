import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import ForgotPassword from "../ForgetPassword/ForgetPassword"
import Register from "../Register/Register"
import Dashboard from "../Dashboard/Dashboard"
import ResetPassword from "../ResetPassword/ResetPassword";
import Inventory from "../Inventory/Inventory";
import Profile from "../Profile/Profile";
import PersonalInformation from "../PersonalIformation/PersonalInformation";
import Landing from "../Landing/Landing"

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

function Home() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/personal" element={<PersonalInformation/>} />
     
      <Route
        path="/dashboard"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default Home;