import { useCallback } from "react";
import InputFrame from "../components/login-components//input-frame";
import "./desktop-sign-up.css";

const DesktopSignUp = () => {
  const onMainButtonContainerClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  return (
    <div className="desktop-sign-up">
      <div className="social-buttondesktop">
        <img className="google-icon" alt="" src="/google.svg" />
        <div className="sign-in-with">Sign up with Google</div>
      </div>
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
