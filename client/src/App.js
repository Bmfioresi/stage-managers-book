import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import Home from "./pages";
import Test from "./pages/test.js";
import UploadImage from "./pages/upload-image.js";
import DisplayImage from "./pages/display-image.js";
import DisplayImages from "./pages/display-images.js";
import SignIn from "./pages/sign-in.js";
import ForgotPassword from "./pages/forgot-password.js";
import SignUp from "./pages/sign-up.js";
import Authenticate from './pages/authenticate.js';
import Hubs from './pages/hubs.js';
import ProfilePage from './pages/profile-page.js';
import ProfileForm from './pages/profile-form.js';
import ProfilePageDemo from './pages/profile-page-demo.js';

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
              authenticated ? <SignIn /> : <SignIn setAuthenticated={setAuthenticated} />
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/upload-image" element={<UploadImage />} />
          <Route path="/display-image" element={<DisplayImage />} />
          <Route path="/display-images" element={<DisplayImages />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/createProfile" element={<ProfileForm />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/profile" element={<ProfilePageDemo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {authenticated && (
            <>
              <Route path="/createProfile" element={<ProfileForm />} />
              <Route path="/hubs" element={<Hubs />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* <Route path="/download" element={<Download />} /> */}
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
