import React, { useState } from "react";
import "./ForgetPassword.css"

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");

  const sendLink = () => {
    const token = Math.random().toString(36).substring(2);
    const expiry = Date.now() + 24 * 60 * 60 * 1000;

    localStorage.setItem(
      "resetToken",
      JSON.stringify({ email, token, expiry })
    );

    alert(
      `Password reset link sent (simulated):\n/reset-password?token=${token}`
    );

    setPage("reset");
  };

  return (
    <div>

      <h2>Reset Your Password</h2>
      <span>Enter your email to receive reset instructions.</span> <br />
      <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} /> 
      <br />
      <button onClick={sendLink}>Send Reset Link</button>
    </div>
  );
}