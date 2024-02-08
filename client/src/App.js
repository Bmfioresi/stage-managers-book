import React, { useState, useEffect } from "react";
import './App.css';
import TestFile from './TestFile.js'
import Authenticate from './Authenticate.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<TestFile />} />
            <Route path="/login" element={<Authenticate />} />
        </Routes>
    </Router>
);
}

export default App;