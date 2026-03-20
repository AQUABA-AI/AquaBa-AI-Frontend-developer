import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PersonalInformation.css'
import ProfileIcon from '../../assets/Avatar-Image.png'


const PersonalInformation = () => {
    const navigate = useNavigate()
    
      // ── Local form state ──────────────────────
      // useState initialises each field from farmerData.
      // When the user types, the state updates live.

      const [isSubmitted, setIsSubmitted] = useState(false);
      const [profileImage, setProfileImage] = useState(null);
        const [form, setForm] = useState({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            avatar: "",
            role: "",
      });
          
        useEffect(() => {
            const savedData = localStorage.getItem("aquaba_personal_info");
            const user = savedData ? JSON.parse(savedData) : null;
            
            let initials = "0";
            
            if (user && user.fullName) {
              const nameArray = user.fullName.trim().split(" ");
            
              const firstNameInitial = nameArray[0][0];
              const lastNameInitial = nameArray[nameArray.length - 1][0];
            
              initials = firstNameInitial + lastNameInitial;
            }


      }, []);

      // Generic change handler – updates whichever field changed
      const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
      }

      const handleImageChange = (e) => {
        const file = e.target.files[0];
      
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
        }
      };
    
      // Submit – replace with your real API call (e.g. PUT /api/user/profile)
    //   const handleSubmit = (e) => {
    //     e.preventDefault()
    //     alert('Profile updated! (Hook up your API here.)')
    //   }

    const handleSubmit = (e) => {
      e.preventDefault();
    
      localStorage.setItem(
        "aquaba_personal_info",
        JSON.stringify({
           fullName:form.fullName,
          profileImage:profileImage || null,
        })
      );
    
      setIsSubmitted(true); 
      alert("Information Updated Successfully ✅");
        navigate("/profile");
    };
    // const initials = `${form.fullName[0]}${form.fullName.split(' ').pop()[0] || ''}`

    const initials = form.fullName
       ?.trim()
       .split(" ")
       .filter(n => n !== "")
       .map(n => n[0])
       .join("")
       .toUpperCase();

    let avatar;

      if (profileImage) {
          avatar = <img src={profileImage} alt="Profile" />;
        } else if (isSubmitted && form.fullName.trim()) {
           avatar = <span>{initials}</span>;
        } else {
          avatar = <img src={ProfileIcon} alt="Default Profile" />;
       }
    
    
      return (
        <div className="pi-page">
    
          {/* ── TOP BAR ── */}
          <header className="page-header">
            <button className="header-back" onClick={() => navigate('/profile')}>
              ←
            </button>
            <h1 className="header-title">Personal Information</h1>
          </header>
    
          {/* ── AVATAR WITH CAMERA BUTTON ── */}
          <div className="pi-avatar-wrap">
            <div className="pi-avatar">
                {/* <img src={form.avatar || 'default-avatar.png'} alt="Profile" /> */}
                <div>{avatar}</div>
            </div>
            {/* Camera icon – clicking opens a file picker */}
            <label className="pi-camera" title="Change photo">
              📷
              {/* Hidden file input – wire to your upload handler */}
              <input type="file" accept="image/*" style={{ display: 'none' }}  onChange={handleImageChange}/>
            </label>
          </div>
    
          {/* ── FORM ── */}
          <form className="pi-form" onSubmit={handleSubmit}>
    
            {/* Full Name */}
            <div className="field">
              <label className="field__label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="field__input"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            
    
            {/* Phone Number */}
            <div className="field">
              <label className="field__label" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="field__input"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
    
            {/* Email – shown as a dropdown to match the screenshot */}
            <div className="field">
              <label className="field__label" htmlFor="email">Email Address</label>
              <div className="field__select-wrap">
                <input
                  id="email"
                  name="email"
                  className="field__select"
                  value={form.email}
                  onChange={handleChange}
                />
                  {/* <option value={form.email}>{form.email}</option> */}
                  {/* Add more email options here if needed */}
                
              </div>
            </div>
    
            {/* Role dropdown */}
            <div className="field">
              <label className="field__label" htmlFor="role">Role</label>
              <div className="field__select-wrap">
                <select
                  id="role"
                  name="role"
                  className="field__select"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option>Business Owner</option>
                  <option>Farm Manager</option>
                  <option>Field Worker</option>
                  <option>Accountant</option>
                </select>
              </div>
            </div>
    
            {/* Address */}
            <div className="field">
              <label className="field__label" htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                className="field__input"
                value={form.address}
                onChange={handleChange}
              />
            </div>
    
            {/* Submit button */}
            <button onClick={handleSubmit} type="button" className="btn-update">
              Update Profile
            </button>
    
          </form>
        </div>
      )
}
 export default PersonalInformation