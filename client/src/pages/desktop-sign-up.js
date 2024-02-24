import { useCallback } from "react";
import axios, { formToJSON } from 'axios';
import { GoogleLogin } from "react-google-login";
import InputFrame from "../components/login-components//input-frame";
import "./desktop-sign-up.css";
import "../global.css";

const DesktopSignUp = () => {
  const onMainButtonContainerClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
    // Send token to server for verification and further processing
    axios.post('http://localhost:8000/auth/google', { token: response.tokenId })
      .then((response) => {
        // Handle the response from your backend
        // For example, setting loggedIn state, storing user data, etc.
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
      });
  }

  return (
    <div className="desktop-sign-up">
      <div className="main-button" onClick={onMainButtonContainerClick}>
        <div className="sign-in">Sign up</div>
      </div>
      <div className="input-frame">
        <InputFrame />
      </div>
      <div className="art1">
        <img className="login-art1" alt="" src="/create-account-art.png" />
      </div>
    </div>
  );
};

export default DesktopSignUp;
