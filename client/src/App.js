import React from "react";
import './App.css';

import Navbar from "./components/Navbar/index.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import Test from "./pages/test";
import Search from "./pages/search";
import Upload from "./pages/upload";
import SignIn from "./pages/desktop-sign-in.js";
import ForgotPassword from "./pages/desktop-forgot-password.js";
import SignUp from "./pages/desktop-sign-up.js";
import Authenticate from './pages/authenticate.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hubs" element={<Hubs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
