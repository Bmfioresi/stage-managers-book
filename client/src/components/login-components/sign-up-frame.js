import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, Navigate } from "react-router-dom";
import axios, { formToJSON } from 'axios';
import "../../css/sign-up-frame.css";
import "../../css/global.css";
import LineFrame from "./sign-up-form-frame";

const SignUpFrame = () => {
  const navigate = useNavigate(); 

  // Used for facilitating login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState("FALSE");

  const onMainButtonClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log(formData);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8000/authenticate';
    console.log(formData.email);
    console.log(formData.password);
    console.log(url);

    axios.post(url, JSON.stringify(formData)).then((response) => {
      // Writing user id to local storeage
      //TODO Not secure; must be updated
      localStorage.setItem('uid', response.data.uid);

      // Ensuring we redirect to profile page
      setLoggedIn("TRUE");
    });
  }

  // Redirecting to profile if user just logged in
  if (loggedIn == "TRUE") {
    return <Navigate to='/profile' />;
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
          />
          <LineFrame
            label1="Email"
            placeholderPlaceholder1="JohnSmith@email.com"
            propWidth1="370px"
            inputType="email"
          />
          <LineFrame
            label1="Password"
            placeholderPlaceholder1="at least 8 characters"
            propWidth1="370px"
            inputType="password"
          />
          <LineFrame
            label1="Verify Password"
            placeholderPlaceholder1="Re-enter password"
            propWidth1="370px"
            inputType="password"
          />
          </div>
          <button className="main-button1" onClick={onMainButtonClick}>
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