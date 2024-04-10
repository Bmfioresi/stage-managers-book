import LeftSide8Column from "../components/login-components/sign-in-left-frame";
import "../css/sign-in.css";
import "../css/pages.css";

const SignIn = ({ setAuthenticated }) => {
  return (
    <div className="right-side">
      <div className="desktop-sign-in">
        <LeftSide8Column setAuthenticated={setAuthenticated} />
        <img className="art-icon" loading="eager" alt="" src="/empty-theatre.png" />
      </div>
    </div>
  );
};

export default SignIn;