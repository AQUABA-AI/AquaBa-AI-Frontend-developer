import React, { useState } from "react";

export default function ResetPassword({ setPage }) {
  const [password, setPassword] = useState("");

  const reset = () => {
    const data = JSON.parse(localStorage.getItem("resetToken"));
    if (!data || Date.now() > data.expiry) {
      alert("Reset link expired");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    user.password = password;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("resetToken");

    alert("Password reset complete. You can now login.");
    setPage("login");
  };

  return (
    <div>
      <h2>Create New Password</h2>
      <input type="password" placeholder="New Password" required onChange={(e) => setPassword(e.target.value)} />
      <button onClick={reset}>Reset Password</button>
    </div>
  );
}