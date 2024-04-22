import React from "react";
import './css/App.css';
import 'react-toastify/dist/ReactToastify.css'; // for toast notifications
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar/index.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Test from "./pages/test.js";
import Hubs from './pages/hubs.js';
import HubIndividual from './pages/hub-individual.js';
import CreateHub from './pages/create-hub.js';
import Resources from "./pages/hub-resources.js";
import Designer from "./pages/hub-designer.js";
import Scripts from "./pages/hub-scripts.js";
import HubAdmin from './pages/hub-admin.js';
// import Authenticate from './pages/authenticate.js';
import ProfileForm from './pages/profile-form.js';
import InputFrame from "./components/login-components/sign-up-frame.js";
import ProfileEdit from './pages/profile-edit.js';
import ProfilePage from './pages/profile-page.js';
import SignIn from "./pages/sign-in.js";
import SignUp from "./pages/sign-up.js";
import ForgotPassword from "./pages/forgot-password.js";
import UnitTests from './pages/unit-tests.js';
import EmailForm from "./pages/email-form.js";
import Logout from './pages/logout.js'
// import PasswordReset from './pages/reset-password.js'; // this will be needed when we implement the reset password feature

function Layout() {
  const location = useLocation(); // Access the location object

  // Check if the current path is the forgot password page
  const showNavbar = location.pathname !== "/forgotpassword";

  return (
    <>
      {showNavbar && <Navbar />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
      <Layout />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/hubs/:hub" element={<HubIndividual />} />
          <Route path="/hubs/:hub/resources" element={<Resources />} />
          <Route path="/hubs/:hub/designer" element={<Designer />} />
          <Route path="/hubs/:hub/scripts" element={<Scripts />} />
          <Route path="/hubs/:hub/admin" element={<HubAdmin />} />
          <Route path="/hubs/create-hub" element={<CreateHub />} />
          {/* <Route path="/login" element={<Authenticate />} /> */}
          <Route path="/createProfile" element={<ProfileForm />} />
          <Route path="/createAccount" element={<InputFrame />} />
          <Route path="/editProfile" element={<ProfileEdit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/emailForm" element={<EmailForm />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/unit-tests" element={<UnitTests />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/reset-password/:token" element={<PasswordReset />} /> */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
