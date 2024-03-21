import FrameForgotPassword from "../components/login-components/frame-forgot-password";
import "./forgot-password.css";
import "../global.css";

const DesktopForgotPassword = () => {
  return (
    <div className="desktop-forgot-password">
      <div className="frame-parent">
        <FrameForgotPassword />
      </div>
      <div className="login-art-frame">
        <div className="art">
          <img
            className="forgot-password-art"
            loading="eager"
            alt=""
            src="/forgot-password-art.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopForgotPassword;