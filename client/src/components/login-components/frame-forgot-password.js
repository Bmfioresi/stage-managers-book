import { useCallback } from "react";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import "../../css/frame-forgot-password.css";
import "../../css/global.css";

const FrameForgotPassword = () => {
  const navigate = useNavigate();

  const onMainButtonClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  const onReturnToTheClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  return (
    <div className="frame-forgot-password">
      <div className="forgot-password1">
        <span className="forgot-password-txt-container">
          <p className="forgot">
            <span>
              <span>{`Forgot `}</span>
            </span>
          </p>
          <p className="forgot">
            <span>
              <span>Password?</span>
              <span className="span2">{` `}</span>
            </span>
            <span className="span2">
              <span className="span4">{` `}</span>
            </span>
          </p>
        </span>
      </div>
      <div className="frame-dont-worry-parent">
        <div className="frame-dont-worry">
          <h3 className="dont-worry-it-container">
            <span>
              <p className="forgot">
                Don’t worry! It happens. Please enter the email
              </p>
              <p className="forgot">address associated with your account.</p>
            </span>
          </h3>
          <div className="frame-help">
            <Input
              placeholderPlaceholder="JohnSmith@email.com"
              propPadding="0px 0px var(--padding-10xl)"
              propDisplay="inline-block"
              propWidth="500px"
              type="email"
            />
            <button className="main-button2" onClick={onMainButtonClick}>
              <div className="sign-in2">Submit</div>
            </button>
          </div>
        </div>
        <div className="return-frame">
          <div className="return-frame-child" />
          <div className="or1">Or</div>
          <div className="return-frame-child" />
        </div>
        <div className="main-frame-manager-book">
          <div className="return-to-the-container" onClick={onReturnToTheClick}>
            <span>{`Return to the `}</span>
            <span className="login-page">Login Page</span>
          </div>
        </div>
      </div>
      <div className="the-stage-manger-book-rectangl">
        <img
          className="the-stage-managers-book-1"
          loading="eager"
          alt=""
          src="/smb-logo.png"
        />
      </div>
    </div>
  );
};

export default FrameForgotPassword;