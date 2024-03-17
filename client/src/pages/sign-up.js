import InputFrame from "../components/login-components/sign-up-input-frame";
import "./sign-up.css";
import "../global.css";

const SignUp = () => {
  return (
    <div className="desktop-sign-up">
      <InputFrame />
      <img className="login-art1" alt="" src="/create-account-art.png" />
    </div>
  );
};

export default SignUp;
