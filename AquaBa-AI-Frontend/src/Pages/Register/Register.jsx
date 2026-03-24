import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      alert("User already exists with this email");
      return;
    }

    const newUser = {
      fullName,
      businessName,
      email,
      phone,
      password,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setShowSuccessModal(true);

    // alert("Registration successful!");
    // navigate("/login");
  };

  return (
    <div className="auth-container">
       {showSuccessModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 8 }}>Account Created!</h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>Your account has been successfully created. You can now log in.</p>
            <button
              onClick={() => { setShowSuccessModal(false); navigate("/login"); }}
              style={{ width: "100%", padding: "12px", background: "#1a73e8", color: "#fff", border: "none", borderRadius: 7, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Go to Login
            </button>
          </div>
        </div>
      )}

      <form className="auth-form" onSubmit={handleRegister}>
      <h3>AquaBa</h3>
        <h2>Create Your Account</h2> 
        <p>Join Thousands of Seafood Businesses</p> <br />


        <div className="input-container">
            <label>Full Name</label>
            <input
              className="input-container-inputs"
              type="text"
              placeholder="Enter your your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

        </div>

        <div className="input-container">
            <label>Business Name</label>
            <input
              className="input-container-inputs"
              type="text"
              placeholder="Enter your your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />

        </div>


        <div className="input-container">
            <label>Email</label>
            <input
              className="input-container-inputs"
              type="email"
              placeholder="Enter your your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

         </div>


         <div className="input-container">
            <label>Phone Number</label>
            <input
              className="input-container-inputs"
              type="tel"
              placeholder="Phone (+234...)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

         </div>

         <div className="input-container">
            <label>Password</label>
            <input
              className="input-container-inputs"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            </div>

         <div className="input-container">
            <label>Confirm Password</label>
            <input
              className="input-container-inputs"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

         </div>


         <div className="submit-forgot-password">
              <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
              <button className="auth-form-button" type="submit" onClick={handleRegister}>Create Account</button>
         </div>

        
        <p className="login">Already have an account? <Link to="/login">Login</Link></p>
      </form>

    </div>
  );
}