import LeftSide8Column from "../components/login-components/left-side8-column";
import "./desktop-sign-in.css";

const DesktopSignIn = () => {
  return (
    <div className="desktop-sign-in">
      <LeftSide8Column />
      <img className="art-icon" loading="eager" alt="" src="/empty-theatre.png" />
    </div>
  );
};

export default DesktopSignIn;
