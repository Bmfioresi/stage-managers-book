import { useCallback } from "react";
import axios, { formToJSON } from 'axios';
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import googleIcon from "./google.svg";
import LineFrame from "./sign-up-form-frame";
import "./sign-up-input-frame.css";
import "../../global.css";
import "../../pages/pages.css"

const InputFrame = () => {
  const onMainButtonClick = useCallback(() => {
    // Please sync "Profile" to the project
  }, []);

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   // Send token to server for verification and further processing
  //   axios.post('http://localhost:8000/auth/google', { token: response.tokenId })
  //     .then((response) => {
  //       console.log(response);
  //       // Handle the response from your backend
  //       // For example, setting loggedIn state, storing user data, etc.
  //     })
  //     .catch((error) => {
  //       console.error('Google Sign-In error:', error);
  //     });
  // }

  return (
    <div className="right-side">
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
            inputType="text"
          />
          <LineFrame
            label1="Email"
            placeholderPlaceholder1="JohnSmith@email.com"
            propWidth1="450px"
            inputType="email"
          />
          <LineFrame
            label1="Password"
            placeholderPlaceholder1="at least 8 characters"
            propWidth1="450px"
            inputType="password"
          />
          <LineFrame
            label1="Verify Password"
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
          {/* <GoogleLogin
            clientId="933341791381-nadvkll3fcr60dv19p4paljj4d2hq603.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'none'}
            render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-button-signup">
                  <img src={googleIcon} alt="Google sign-up" />
                  <div>Sign Up with Google</div>
                </button>
            )}
          /> */}
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
    </div>
  );
};

export default InputFrame;