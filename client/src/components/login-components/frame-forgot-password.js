import { useCallback } from "react";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import "../../css/frame-forgot-password.css";
import "../../css/global.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const FrameForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const onMainButtonClick = useCallback(() => {
  //   navigate("/signin");
  // }, [navigate]);

  // I needed to get OAuth2 working before I could use this
  const onMainButtonClick = useCallback(async (event) => {
    event.preventDefault(); // Prevent the default form submission
    //console.log("Sending API request with email:", email);
    try {
      //console.log("Email state before sending request:", email);
      const response = await axios.post("http://localhost:8000/forgot-password", JSON.stringify({ email }));
      //console.log("API response:", response);

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/signin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("This page isn't implemented yet. Please try again later.");
    }
  }, [email]);

  const onInputChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

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
          <form onSubmit={(event) => onMainButtonClick(event)} method="POST">
          <div className="frame-help">
            <Input
              placeholderPlaceholder="JohnSmith@email.com"
              propPadding="0px 0px var(--padding-10xl)"
              propDisplay="inline-block"
              propWidth="500px"
              type="email"
              name="email"
              onChange={onInputChange}
              value={email}
            />
            <button type="submit" className="main-button2">
              <div className="sign-in2">Submit</div>
            </button>
          </div>
        </form>
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