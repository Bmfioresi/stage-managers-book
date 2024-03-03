import React from "react";
import './App.css';

import Navbar from "./components/Navbar/index.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import Home from "./pages";
import Test from "./pages/test.js";
import UploadImage from "./pages/upload-image.js";
import DisplayImage from "./pages/display-image.js";
import DisplayImages from "./pages/display-images.js";
import Resources from "./pages/resources.js";
import Designer from "./pages/designer.js";
import SignIn from "./pages/desktop-sign-in.js";
import ForgotPassword from "./pages/desktop-forgot-password.js";
import SignUp from "./pages/desktop-sign-up.js";
import Authenticate from './pages/authenticate.js';
import Hubs from './pages/hubs.js';
import ProfilePage from './pages/profile-page.js';
import ProfileForm from './pages/profile-form.js';
import ProfilePageDemo from './pages/profile-page-demo.js';
import Script from './pages/scripts.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
          <Route path="/upload-image" element={<UploadImage />} />
          <Route path="/display-image" element={<DisplayImage />} />
          <Route path="/display-images" element={<DisplayImages />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/createProfile" element={<ProfileForm />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/profile" element={<ProfilePageDemo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="./script" element={<Script />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
