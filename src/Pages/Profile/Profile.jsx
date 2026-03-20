// ─────────────────────────────────────────────
// src/pages/Profile.jsx
//
// The Profile screen (screenshot 1).
// Shows:
//   • Back arrow  +  "Profile" title
//   • Avatar card with name + "Verified Account"
//   • "Account Settings" section with two rows:
//       – Personal Information  (navigates to /personal)
//       – Change Password
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import React, { Component } from 'react'
import ProfileIcon from '../../assets/Avatar-Image.png'
import './Profile.css'




// ── Small helper: one settings row ───────────
// Renders a tappable row with a right-chevron.
// `onClick` is called when the row is pressed.
function SettingsRow({ label, onClick }) {
  return (
    <button className="settings-row" onClick={onClick}>
      <span className="settings-row__label">{label}</span>
      <span className="settings-row__chevron">›</span>
    </button>
  )
}

// ── Main component ────────────────────────────
function Profile() {
  // useNavigate lets us change the URL programmatically
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
       fullName: "",
       profileImage: profileImage || null,
      });

  const [initial, setInitial] = useState("");

  
  // Load saved info from localStorage on mount
  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem("aquaba_personal_info"));
    if (savedInfo) {
      setUserInfo(savedInfo);
         console.log(savedInfo)
      // Generate initials if fullName exists
      const initial = savedInfo.fullName
        ?.trim()
        .split(" ")
        .filter(n => n !== "")
        .map(n => n[0])
        .join("")
        .toUpperCase();

      setInitial(initial);
      setProfileImage(profileImage)
    }
  }, []);

  // 3-condition avatar rendering
  let avatar;
  if (userInfo.profileImage) {
    avatar = <img src={userInfo.profileImage} alt="Profile" width={100} />;
  } else if (userInfo.fullName.trim()) {
    avatar = (
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: "#b5693a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "35.41px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {initial}
      </div>
    );
  } else {
    avatar = <img src={ProfileIcon} alt="Default Profile" width={100} />;
  }


  
  
  

  return (
    <div className="profile-page">

      {/* ── TOP BAR: back arrow + page title ── */}
      <header className="page-header">
        {/*
          navigate(-1) goes back to the previous page,
          just like pressing the browser's back button.
        */}
        <button className="header-back" onClick={() => navigate('/inventory')}>
          ←
        </button>
        <h1 className="header-title">Profile</h1>
      </header>

      {/* ── AVATAR CARD ── */}
      <div className="avatar-card">

        {/* Circle avatar with initials fallback */}
        <div className="avatar-circle">
            {avatar}

          {/* Green verified tick badge */}
          {userInfo 
          ? (<span className="verified-badge" title="Verified account">✓</span>) 
          : (<span className="verified-badge" title="Unverified account"></span>
            )}
        </div>

        {/* Name + verified label */}
        <div className="avatar-info">
          <p className="avatar-name">{userInfo.fullName}</p>
          <p className="avatar-verified">
              {userInfo ? "Verified Account" : "Unverified Account"}
          </p>
        </div>
      </div>

      {/* ── ACCOUNT SETTINGS SECTION ── */}
      <section className="settings-section">
        <h2 className="settings-section__title">Account Settings</h2>

        <div className="settings-list">
          {/*
            Clicking this row navigates to /personal.
            We use navigate('/personal') instead of a <Link>
            so the row can stay a <button> (better accessibility).
          */}
          <SettingsRow
            label="Personal Information"
            onClick={() => navigate('/personal')}
          />

          {/* Change Password row – navigation can be wired up later */}
          <SettingsRow
            label="Change Password"
            onClick={() => navigate('/reset-password/:token')}
          />
        </div>
      </section>

    </div>
  )
}

export default Profile













































// import React from 'react'
// import Tab from '../../components/Tab/Tab';
// import { Icon } from "@iconify/react";
// import "./Profile.css"


// function Profile(){
//   return 
//     }

// export default Profile




// (<div style={{height: "100vh", background: "#fff"}}>
//         <div style={{  background: "#fff", padding: "10px 10px", display: "flex", alignItems: "center", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100, gap: 2 }}>
//             <Icon style={{ fontSize: "40px", color: "#928c8c", fontWeight: "200" }} icon="mdi:arrow-left" />
//             <h2 style={{ margin: 0, fontSize: "26px", fontWeight: 700, fontFamily: "Inter, sans-serif", color: "#000" }}>Profile</h2>
//         </div>

//         <div style={{maxWidth: 430, background: "#fff", padding: 20, display: "flex", flexDirection: "column", gap: 30 }}>
//             <div style={{ borderRadius: 8, boxShadow: "2px 4px 6px rgba(0,0,0,0.1)", display:"flex", alignItems:"center", gap: 20, padding: 20, margin:"20px 0 0 0" }}>
//                 <div style={{width: "325px",  fontFamily: "Sora, sans-serif", backgroundColor:"blue", borderRadius: "50%", width:"70px", height:"70px", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize: 35.41, fontWeight: "semibold" }}>CO</div>
//                 <div>
//                     <h3 style={{padding:"5px 0px 5px 13px", fontFamily:"Inter", fontSize:16, fontWeight: 600}}>Josephine Ohwifo</h3>
//                     <p style={{ letterSpacing: 0.41, width: 120, fontFamily: "Inter, sans-serif", padding: "5px 10px", background: "#f5f5f5", border: "none", borderRadius: 6, fontSize: 13, color: "green" }}>
//                     Verified Account
//                     </p>         
//                 </div>

//             </div>
            
//              {/* second */}
//              <div style={{display:"flex", flexDirection:"column", gap: 20}}>
//                 <h2 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "Inter, sans-serif", color: "#000" }}>Account Settings</h2>

//                 <div>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px", borderTop:"none", borderLeft: "0.5px solid #eee", borderRight: "0.5px solid #eee", borderBottom: "1px solid #eee", cursor: "pointer" }}>
//                         <p style={{ color:"#928c8c",fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>Personal Information</p>
//                         <Icon style={{ fontSize: "20px", color: "#928c8c", fontWeight: "200" }} icon="mdi:arrow-right" />
//                     </div>

//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px", border: "1px solid #eee", cursor: "pointer" }}>
//                         <p style={{ color:"#928c8c",fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>Change Password</p>
//                         <Icon style={{ fontSize: "20px", color: "#928c8c", fontWeight: "200" }} icon="mdi:arrow-forward" />
//                     </div>

//                     {/* <Tab text="Personal Information" borderTop="none" borderLeft="0.5px solid #eee" borderRight="0.5px solid #eee"/>
//                     <Tab text="Change Password" />
//                      */}
                   
//                 </div>
//              </div>
                
            
//             </div>
//         </div>
    
      


//   )
