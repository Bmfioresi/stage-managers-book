import { useState, useCallback } from "react";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import "./left-side8-column.css";

const LeftSide8Column = () => {
  const [placeholderText1Value, setPlaceholderText1Value] = useState("");
  const navigate = useNavigate();

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/forgotpassword");
  }, [navigate]);

  const onMainButtonClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  const onDontYouHaveClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div className="left-side-8-column">
      <div className="left-side-8-column-child" />
      <div className="input-frame1">
        <div className="welcome-back">
          <span>
            <span>Welcome Back</span>
            <span className="span">{` `}</span>
          </span>
          <span className="span">
            <span>{` `}</span>
          </span>
        </div>
        <form className="input-label">
          <div className="today-is-a-container">
            <span>
              <p className="today-is-a">{`Today is a new day. It's your day. You shape it. `}</p>
              <p className="today-is-a">
                Sign in to begin orchestrating the magic.
              </p>
            </span>
          </div>
          <Input
            placeholderPlaceholder="stageManagersBook@email.com"
            propPadding1="var(--padding-base) var(--padding-mid)"
            propWidth="500px"
            type="email"
          />
          <div className="input3">
            <div className="label1">Password</div>
            <div className="input4">
              <div className="input5" />
              <input
                className="placeholder1"
                placeholder="Enter Password"
                type="password"
                value={placeholderText1Value}
                onChange={(event) =>
                  setPlaceholderText1Value(event.target.value)
                }
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
      <button className="social-buttondesktop1">
        <img className="google-icon1" alt="" src="/google.svg" />
        <div className="sign-in-with1">Sign in with Google</div>
      </button>
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
