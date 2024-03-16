import { useCallback } from "react";
import axios, { formToJSON } from 'axios';
import { GoogleLogin } from "react-google-login";
import InputFrame from "../components/login-components/sign-up-input-frame";
import "./sign-up.css";
import "../global.css";

const SignUp = () => {
  const onMainButtonContainerClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

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

export default SignUp;