import FrameForgotPassword from "../components/frame-forgot-password";
import "./desktop-forgot-password.css";

const DesktopForgotPassword = () => {
  return (
    <div className="desktop-forgot-password">
      <div className="frame-parent">
        <FrameForgotPassword />
      </div>
      <div className="login-art-frame">
        <div className="art">
          <img
            className="login-art"
            loading="eager"
            alt=""
            src="/login-art@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopForgotPassword;
