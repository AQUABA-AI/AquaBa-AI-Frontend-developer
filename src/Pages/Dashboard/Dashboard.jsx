import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("welcomeName");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {name} 👋</h1>
      <p>This is your seafood business dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}