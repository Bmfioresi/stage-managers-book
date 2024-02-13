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
                set the scene. Sign up to start crafting the theatrical
              </p>
              <p className="today-marks-a">{`experience. `}</p>
            </span>
          </div>
          <div className="today-marks-a-container1">
            <span>
              <p className="today-marks-a">
                Today marks a new beginning. It’s your stage. You
              </p>
              <p className="today-marks-a">
                set the scene. Sign up to start crafting the theatrical
              </p>
              <p className="today-marks-a">{`experience. `}</p>
            </span>
          </div>
        </div>
        <div className="button-instance">
          <LineFrame
            label="Full Name"
            placeholderPlaceholder="John Smith"
            label1="Full Name"
            placeholderPlaceholder1="John Smith"
            propWidth="83px"
            propWidth1="83px"
          />
          <LineFrame
            label="Email"
            placeholderPlaceholder="JohnSmith@email.com"
            label1="Email"
            placeholderPlaceholder1="JohnSmith@email.com"
            propWidth="167px"
            propWidth1="167px"
          />
          <LineFrame
            label="Password"
            placeholderPlaceholder="at least 8 characters"
            label1="Password"
            placeholderPlaceholder1="at least 8 characters"
            propWidth="149px"
            propWidth1="149px"
          />
          <LineFrame
            label="Re-enter Password"
            placeholderPlaceholder="Match password"
            label1="Re-enter Password"
            placeholderPlaceholder1="Match password"
            propWidth="121px"
            propWidth1="121px"
          />
          <button className="main-button3" onClick={onMainButtonClick}>
            <div className="sign-in3">Sign up</div>
          </button>
        </div>
        <div className="divider-frame">
          <div className="main-manager">
            <div className="input-pair" />
            <div className="input-label1" />
          </div>
          <div className="or-button">
            <div className="or2">Or</div>
            <div className="or3">Or</div>
          </div>
          <div className="main-manager">
            <div className="input-pair" />
            <div className="main-manager-item" />
          </div>
        </div>
        <button className="social-buttondesktop2">
          <img className="google-icon2" alt="" src="/google.svg" />
          <img className="facebook-icon2" alt="" />
          <div className="sign-in-with2">Sign up with Google</div>
        </button>
      </form>
      <div className="art-frame">
        <div className="stage-mgr-book">
          <img
            className="the-stage-managers-book-11"
            alt=""
            src="/the-stage-managers-book-1@2x.png"
          />
          <img
            className="the-stage-managers-book-12"
            loading="eager"
            alt=""
            src="/the-stage-managers-book-1@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default InputFrame;
