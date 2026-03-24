import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);


  const handleRegister =(e)=> navigate("/register");
  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    /* ===== ADMIN LOGIN (FRONTEND MOCK) ===== */
    if (email === "admin@seafood.com" && password === "Admin123") {
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "admin");
      localStorage.setItem("welcomeName", "Admin");

      navigate("/admin/inventory");
      return;
    }

    /* ===== USER LOGIN ===== */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("token", "user-token");
    localStorage.setItem("role", "user");
    localStorage.setItem("welcomeName", matchedUser.fullName);

    navigate("/inventory");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h3 className="auth-form-heading-three">Aqua<span id="span">Ba</span></h3> <br />
        <h2>Welcome Back</h2> 
        <p className="auth-form-paragraph">Manage your Seafood Inventory easily</p> <br />
        
         
         <div className="input-container">
            <label>Email</label>
            <input
              className="input-container-inputs"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        
         <div className="submit-forgot-password">
            <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
            <button className="auth-form-button" type="button" onClick={handleLogin}>Log In</button>
         </div>
        

        <div className="divider-container">
         
           <span>OR</span>
      
        </div>
        <button className="auth-form-button create-button" type="button" onClick={handleRegister}>Create Account</button>
        <p  className="terms-privacy">Terms & Privacy</p>
      </form>
    </div>
  );
}