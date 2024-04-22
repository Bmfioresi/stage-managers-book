import React, { useState, useEffect, useCallback } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Navigate } from "react-router-dom";
import axios, { formToJSON } from 'axios';
import "../../css/sign-in-left-frame.css";
import "../../css/global.css";

const LeftSide8Column = () => {
  const navigate = useNavigate();

  // Used for facilitating login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState("FALSE");

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/forgotpassword");
  }, [navigate]);

  const onMainButtonClick = useCallback(() => {
    navigate("/profile")
  }, []);

  const onDontYouHaveClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8000/authenticate';

    const response = await axios.post(url, JSON.stringify(formData));

    if (response.status === 201) {
      localStorage.setItem('sessionID', response.data); // WRITING SESSION ID TO LOCAL STORAGE
      setLoggedIn("TRUE");
      toast.success('Successfully logged in');
    } else {
      setLoggedIn("FALSE");
      navigate("/signin");
      toast.error(response.data.message);
    }
  };

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
              <p className="today-is-a">{`Today is a new day. It's your day. You shape it. `}</p>
              <p className="today-is-a">
                Sign in to begin orchestrating the magic.
              </p>
            </span>
          </div>
          <div className="email-pass-input">
            <div className="label">Email</div>
            <div className="input4">
              <div className="input5" />
              <input
                className="placeholder-signin"
                placeholder="stageManagersBook@email.com"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleLoginChange}
                style={{ width: "500px", height: "20px" }}
              />
            </div>
          </div>
          <div className="email-pass-input">
            <div className="label">Password</div>
            <div className="input4">
              <div className="input5" />
              <input
                className="placeholder-signin"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleLoginChange}
                style={{ width: "500px", height: "20px" }}
              />
            </div>
          </div>
          <div className="forgot-password" onClick={onForgotPasswordTextClick}>
            Forgot Password? (Not implemented yet)
          </div>
          <button className="main-button1" onClick={handleLoginSubmit}>
            <div className="sign-in1">Sign in</div>
          </button>
        </form>
      </div>
      <div className="dont-you-have-container" onClick={onDontYouHaveClick}>
        <span className="dont-you-have-container1">
          <span>{`Don't you have an account? `}</span>
          <span className="sign-up">Sign up</span>
        </span>
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

export default LeftSide8Column;