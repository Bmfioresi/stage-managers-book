import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import Home from "./pages";
import Test from "./pages/test.js";
import UploadImage from "./pages/upload-image.js";
import DisplayImage from "./pages/display-image.js";
import SignIn from "./pages/desktop-sign-in.js";
import ForgotPassword from "./pages/desktop-forgot-password.js";
import SignUp from "./pages/desktop-sign-up.js";
import Authenticate from './pages/authenticate.js';
import ProfileForm from './pages/profileForm.js';
import Hubs from './pages/hubs.js';
import Profile from './pages/profile.js';

function App() {
  // const [authenticated, setAuthenticated] = useState(true); -- for testing uncomment this line and comment the line below
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        {authenticated && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? <Home /> : <SignIn setAuthenticated={setAuthenticated} />
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/upload-image" element={<UploadImage />} />
          <Route path="/display-image" element={<DisplayImage />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/createProfile" element={<ProfileForm />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {authenticated && (
            <>
              <Route path="/createProfile" element={<ProfileForm />} />
              <Route path="/hubs" element={<Hubs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/download" element={<Download />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
