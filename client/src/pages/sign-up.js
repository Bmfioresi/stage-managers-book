import SignUpFrame from "../components/login-components/sign-up-frame";
import "./sign-up.css";
import "./pages.css";

const SignIn = ({ setAuthenticated }) => {
  return (
    <div className="right-side">
      <div className="desktop-sign-in">
        <SignUpFrame setAuthenticated={setAuthenticated} />
        <img className="art-icon" loading="eager" alt="" src="/create-account-art.png" />
      </div>
    </div>
  );
};

export default SignIn;