import { useCallback } from "react";
import "./welcome-back-side-col.css";

const WelcomeBackSideCol = () => {
  const onForgotPasswordTextClick = useCallback(() => {
    // Please sync "Desktop: Forgot Password" to the project
  }, []);

  const onMainButtonClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  const onDontYouHaveClick = useCallback(() => {
    // Please sync "Desktop: Sign-up" to the project
  }, []);

  return (
    <div className="left-side-8-column">
      <div className="left-side-8-column-child" />
      <div className="welcome-back-parent">
        <div className="welcome-back">
          <span>
            <span>Welcome Back</span>
            <span className="span">{` `}</span>
          </span>
          <span className="span1">
            <span>{` `}</span>
          </span>
        </div>
        <form className="today-is-a-new-day-its-your-parent">
          <div className="today-is-a-container">
            <span>
              <p className="today-is-a">{`Today is a new day. It's your day. You shape it. `}</p>
              <p className="sign-in-to">
                Sign in to begin orchestrating the magic.
              </p>
            </span>
          </div>
          <div className="input">
            <div className="label">Email</div>
            <div className="input1">
              <div className="input2" />
              <input
                className="placeholder"
                placeholder="stageManagersBook@email.com"
                type="text"
              />
            </div>
          </div>
          <div className="input3">
            <div className="label1">Password</div>
            <div className="input4">
              <div className="input5" />
              <input
                className="placeholder1"
                placeholder="Enter Password"
                type="text"
              />
            </div>
          </div>
          <div className="forgot-password" onClick={onForgotPasswordTextClick}>
            Forgot Password?
          </div>
          <button className="main-button" onClick={onMainButtonClick}>
            <div className="sign-in">Sign in</div>
          </button>
        </form>
      </div>
      <div className="line-frame">
        <div className="or-text" />
        <div className="or">Or</div>
        <div className="or-text1" />
      </div>
      <button className="social-buttondesktop">
        <img className="google-icon" alt="" src="/google.svg" />
        <img className="facebook-icon" alt="" />
        <div className="sign-in-with">Sign in with Google</div>
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
        src="/smb-logo@2x.png"
      />
    </div>
  );
};

export default WelcomeBackSideCol;
