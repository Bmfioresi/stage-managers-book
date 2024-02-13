import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';

function Authenticate() {

    const [userId, setUserId] = useState("Not Logged In");

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
        console.log(formData)
        axios.post(url, formData).then((response) => {
            console.log("RESPONSE")
            console.log(response);
            console.log(response.data);
            setUserId(response.data.uid); // Updating userID
            console.log(userId);
        });

        console.log("SUBMIT")
    }

    const dummyFunc = (event) => {
      event.preventDefault();
      console.log("DUMMY FUNC")
    }

    return (
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
  );
}

export default Authenticate;
