import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "../components/Navbar/elements";
import axios from 'axios';
import '../css/pages.css';
import '../css/hub-pages.css';

const CreateHub = () => {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:8000";
    var name = "";
    var description = "";
    const [formData, setFormData] = useState({
        name: 'Default',
        description: 'Default',
        sessionID: localStorage.getItem("sessionID"),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createHub();
    };
    
    async function createHub() {
        const url = `${baseUrl}/create-hub`;
        setFormData({
            name: name,
            sessionID: localStorage.getItem("sessionID"), // passing it session
            description: description
        });
        await axios.post(url, JSON.stringify(formData)).then((response) => {
            console.log(response);
            let path = `/hubs/${response.data.hid}`; 
            navigate(path);
        });
    }

    return (
        <div className="bucket">
            <div className="overview" style={{height: "74%", top: "11%", width: "76%", right: "12%"}}>
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <label style={{color: "black", fontSize: "30px", padding: ".5%"}} htmlFor="name">Name: </label>
                    <input style={{width: "90%", alignSelf: "center"}} type="text" id="name" name="name" placeholder={"Enter Name"} onChange={(e) => name = e.target.value}></input>
                    <br></br>
                    <label style={{color: "black", fontSize: "30px", padding: ".5%"}} htmlFor="description">Description: </label>
                    <input style={{width: "90%", alignSelf: "center"}} type="text" id="description" name="description" placeholder={"Enter Description"} onChange={(e) => description = e.target.value}></input>
                    <input style={{width: "10%", alignSelf: "center"}} type="submit"/>
                </form>
            </div>            
        </div>
    );
    
};

export default CreateHub;