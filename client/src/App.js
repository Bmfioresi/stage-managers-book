import React from "react";
import './App.css';

import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import Test from "./pages/test";
import Search from "./pages/search";
import Upload from "./pages/upload";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;