import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, Navigate } from "react-router-dom";
import axios, { formToJSON } from 'axios';
import './pages.css';

function Authenticate() {

    const [userId, setUserId] = useState("-2");
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState("FALSE");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData.email);
        console.log(formData.password)

        const url = 'http://localhost:8000/authenticate';
        // Converting form to json format

        await axios.post(url, JSON.stringify(formData)).then((response) => {
            console.log("RESPONSE")
            console.log(response);
            
            console.log("NEW Session ID");
            console.log(response.data);
            localStorage.setItem('sessionID', response.data);
            console.log("WROTE SESSION ID TO LOCAL STORAGE");
            console.log(localStorage.getItem('sessionID'));
        });

        console.log("SUBMIT");
        setLoggedIn("TRUE");
    }

    const dummyFunc = (event) => {
      event.preventDefault();
      console.log("DUMMY FUNC")
    }

    if (loggedIn == "TRUE") {
        return <Navigate to='/profile' />;
    }

    return (
        <div className="right-side">
        <div myclass="myDiv">
            <h2>Login</h2>
            <form id="makeAccount" onSubmit={dummyFunc}>  
                <button type="submit" className="myButton">Don't have an account?</button>
            </form><br/><br/>
            <form id="resetPass" onSubmit={dummyFunc}>  
                <button type="submit" className="myButton">Reset Pass</button>
            </form><br/><br/>

            <form id="login" onSubmit={handleSubmit} method="POST">
                <label>Email: <input type="text" id="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange}/></label>
                <label>Password: <input type="text" id="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/></label><br/>
                <button className="myButton">Submit</button>
            </form><br/><br/>
            <h3>{userId}</h3>
        </div>
        </div>
  );
}

export default Authenticate;
