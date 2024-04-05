import React from "react";
import { useEffect, useState } from "react";
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
// import DisplayImage from "./pages/display-image.js";
import DisplayImages from "./pages/display-images.js";
import Resources from "./pages/resources.js";
import Designer from "./pages/designer.js";
import Scripts from "./pages/hub-scripts.js";
// import DeleteFile from "./pages/delete-file.js";
import SignIn from "./pages/sign-in.js";
import ForgotPassword from "./pages/forgot-password.js";
import SignUp from "./pages/sign-up.js";
import Authenticate from './pages/authenticate.js';
import Hubs from './pages/hubs.js';
import HubIndividual from './pages/hub-individual.js';
import ProfilePage from './pages/profile-page.js';
import ProfileForm from './pages/profile-form.js';
//import ProfilePageDemo from './pages/profile-page-demo.js';
import Script from './pages/scripts.js';
import ProfileEdit from './pages/profile-edit.js';
import UnitTests from './pages/unit-tests.js';
import InputFrame from "./components/login-components/sign-up-frame.js";
import HubAdmin from './pages/hub-admin.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
          <Route path="/upload-image" element={<UploadImage />} />
          {/* <Route path="/display-image" element={<DisplayImage />} /> */}
          <Route path="/display-images" element={<DisplayImages />} />
          <Route path="/hubs/:hub" element={<HubIndividual />} />
          <Route path="/hubs/:hub/resources" element={<Resources />} />
          <Route path="/hubs/:hub/designer" element={<Designer />} />
          <Route path="/hubs/:hub/scripts" element={<Scripts />} />
          <Route path="/hubs/:hub/hub-admin" element={<HubAdmin />} />
          {/* <Route path="/delete-file" element={<DeleteFile />} /> */}
          <Route path="/login" element={<Authenticate />} />
          <Route path="/createProfile" element={<ProfileForm />} />
          <Route path="/createAccount" element={<InputFrame />} />
          <Route path="/editProfile" element={<ProfileEdit />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/script" element={<Script />} />
          <Route path="/unit-tests" element={<UnitTests />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
