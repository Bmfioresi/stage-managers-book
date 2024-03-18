import LeftSide8Column from "../components/login-components/sign-in-left-frame";
import "./sign-in.css";
import "../global.css";

const SignIn = ({ setAuthenticated }) => {
  return (
    <div className="desktop-sign-in">
      <LeftSide8Column setAuthenticated={setAuthenticated} />
      <img className="art-icon" loading="eager" alt="" src="/empty-theatre.png" />
    </div>
  );
};

export default SignIn;