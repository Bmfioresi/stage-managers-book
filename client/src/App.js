import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import Home from "./pages";
import Test from "./pages/test";
import Search from "./pages/search";
import Upload from "./pages/upload";
import SignIn from "./pages/desktop-sign-in.js";
import ForgotPassword from "./pages/desktop-forgot-password.js";
import SignUp from "./pages/desktop-sign-up.js";
import ProfileForm from './pages/profileForm.js';
import Hubs from './pages/hubs.js';
import Profile from './pages/profile.js';
import Download from './pages/download';

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
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/signin" element={<SignIn setAuthenticated={setAuthenticated} />} />
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
