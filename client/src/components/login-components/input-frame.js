import { useCallback } from "react";
import LineFrame from "./line-frame";
import "./input-frame.css";

const InputFrame = () => {
  const onMainButtonClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  return (
    <div className="input-frame2">
      <div className="create-account-frame">
        <div className="create-account">
          <span>
            <span>Create Account</span>
            <span className="span5">{` `}</span>
          </span>
          <span className="span5">
            <span>{` `}</span>
          </span>
        </div>
      </div>
      <form className="input-frame3">
        <div className="input-frame4">
          <div className="today-marks-a-container">
            <span>
              <p className="today-marks-a">
                Today marks a new beginning. It’s your stage. You
              </p>
              <p className="today-marks-a">
                set the scene. Sign up to start crafting the theatrical experience.
              </p>
              <p className="today-marks-a"></p>
            </span>
          </div>
        </div>
        <div className="button-instance">
          <LineFrame
            label1="Full Name"
            placeholderPlaceholder1="John Smith"
            propWidth1="450px"
          />
          <LineFrame
            label1="Email"
            placeholderPlaceholder1="JohnSmith@email.com"
            propWidth1="450px"
            type="email"
          />
          <LineFrame
            label1="Password"
            placeholderPlaceholder1="at least 8 characters"
            propWidth1="450px"
            inputType="password"
          />
          <LineFrame
            label1="Password"
            placeholderPlaceholder1="Re-enter password"
            propWidth1="450px"
            inputType="password"
          />
          <button className="main-button3" onClick={onMainButtonClick}>
            <div className="sign-in3">Sign up</div>
          </button>
        </div>
        <div className="divider-frame">
          <div className="line-frame">
            <div className="or-text" />
            <div className="or">Or</div>
            <div className="or-text" />
          </div>
        </div>
        <button className="social-buttondesktop2">
          <img className="google-icon2" alt="" src="/google.svg" />
          <div className="sign-in-with2">Sign up with Google</div>
        </button>
      </form>
      <div className="art-frame">
        <div className="stage-mgr-book">
          <img
            className="the-stage-managers-book-logo"
            loading="eager"
            alt=""
            src="/smb-logo.png"
          />
        </div>
      </div>
    </div>
  );
};

export default InputFrame;
