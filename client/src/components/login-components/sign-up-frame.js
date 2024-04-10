import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios, { formToJSON } from 'axios';
import "./sign-up-frame.css";
import "../../global.css";
import LineFrame from "./sign-up-form-frame";

const SignUpFrame = () => {
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    // console.log("Input name:", name, "Value:", value); // Debugging log
    setFormData(prevState => ({ ...prevState, [name]: value}));
};
  

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); 

    console.log('Submitting form with:', formData); // Debug log
    const url = 'http://localhost:8000/register'; // URL for registration

    await axios.post(url, JSON.stringify(formData)).then((response) => {
      console.log('Received response:', response); // Debug log

      if (response.status === 201) {
        navigate('/signin');
      } else {
        alert('Failed to register');
      }
    });
  }

  return (
    <div className="left-side-column">
      <div className="left-side-column-child" />
      <div className="welcome-back-container">
        <div className="welcome-back">
          <span>
            <span>Welcome Back</span>
            <span className="span">{` `}</span>
          </span>
        </div>
        <form className="input-label" onSubmit={handleLoginSubmit} method="POST">
          <div className="today-is-a-container">
            <span>
              <p className="today-is-a">{`Today marks a new beginning. It’s your stage. You
                set the scene. Sign up to start crafting the theatrical experience.`}</p>
            </span>
          </div>
          <div className="button-instance">
          <LineFrame
            label1="Full Name"
            placeholderPlaceholder1="John Smith"
            propWidth1="370px"
            inputType="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleLoginChange}
          />
          <LineFrame
            label1="Email"
            placeholderPlaceholder1="JohnSmith@example.com"
            propWidth1="370px"
            inputType="email"
            name="email"
            value={formData.email}
            onChange={handleLoginChange}
          />
          <LineFrame
            label1="Password"
            placeholderPlaceholder1="at least 8 characters"
            propWidth1="370px"
            inputType="password"
            name="password"
            value={formData.password}
            onChange={handleLoginChange} // Pass the handler
            type = "password" // to hide the password
          />
          <LineFrame
            label1="Verify Password"
            placeholderPlaceholder1="Re-enter password"
            propWidth1="370px"
            inputType="password"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleLoginChange} // Pass the handler
            type = "password" // to hide the password
          />
          </div>
          <button className="main-button1" type="submit">
            <div className="sign-in1">Sign up</div>
          </button>
        </form>
      </div>
      <img
        className="smb-logo-icon"
        loading="eager"
        alt=""
        src="/smb-logo.png"
      />
    </div>
  );
};

export default SignUpFrame;