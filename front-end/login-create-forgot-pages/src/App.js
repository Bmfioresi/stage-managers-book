import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import DesktopSignIn from "./pages/desktop-sign-in";
import DesktopForgotPassword from "./pages/desktop-forgot-password";
import DesktopSignUp from "./pages/desktop-sign-up";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-forgot-password":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-signup":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<DesktopSignIn />} />
      <Route
        path="/desktop-forgot-password"
        element={<DesktopForgotPassword />}
      />
      <Route path="/desktop-signup" element={<DesktopSignUp />} />
    </Routes>
  );
}
export default App;
