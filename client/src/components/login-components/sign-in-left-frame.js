import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, Navigate } from "react-router-dom";
import axios, { formToJSON } from 'axios';
// import { GoogleLogin } from "@react-oauth/google";
import googleIcon from "./google.svg";
import "./sign-in-left-frame.css";
import "../../global.css";

const LeftSide8Column = () => {
  const navigate = useNavigate();

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   // Send token to server for verification and further processing
  //   axios.post('http://localhost:8000/auth/google', { token: response.tokenId })
  //     .then((response) => {
  //       // Handle the response from your backend
  //       // For example, setting loggedIn state, storing user data, etc.
  //     })
  //     .catch((error) => {
  //       console.error('Google Sign-In error:', error);
  //     });
  // }

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
    // Please sync "Profile" to the project
  }, []);

  const onDontYouHaveClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

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
                className="placeholder"
                placeholder="stageManagersBook@email.com"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleLoginChange}
                style={{ width: "500px" }}
              />
            </div>
          </div>
          <div className="email-pass-input">
            <div className="label">Password</div>
            <div className="input4">
              <div className="input5" />
              <input
                className="placeholder"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleLoginChange}
                style={{ width: "500px" }}
              />
            </div>
          </div>
          <div className="forgot-password" onClick={onForgotPasswordTextClick}>
            Forgot Password?
          </div>
          <button className="main-button1" onClick={onMainButtonClick}>
            <div className="sign-in1">Sign in</div>
          </button>
        </form>
      </div>
      <div className="line-frame">
        <div className="or-text" />
        <div className="or">Or</div>
        <div className="or-text" />
      </div>
      {/* <GoogleLogin
          clientId="391303195070-1j9epkem5pktr7ueg1hjhufb9pberau2.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-buttondesktop">
                <img src={googleIcon} alt="Google sign-in" />
                <div>Sign In with Google</div>
              </button>
          )}
        /> */}
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