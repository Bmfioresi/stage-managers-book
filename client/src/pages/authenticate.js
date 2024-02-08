import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Authenticate() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData.email);
        console.log(formData.password)
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

            <form id="login" onSubmit={handleSubmit}>
                <label>Email: <input type="text" id="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange}/></label>
                <label>Password: <input type="text" id="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/></label><br/>
                <button className="myButton">Submit</button>
            </form><br/><br/>
        </div>
  );
}

export default Authenticate;
