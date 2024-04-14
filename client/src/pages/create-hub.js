import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "../components/Navbar/elements";
import axios from 'axios';
import '../css/pages.css';
import '../css/hub-pages.css';

const CreateHub = () => {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:8000";
    const nameInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    var formData = {
        name: 'Default',
        description: 'Default',
        sessionID: localStorage.getItem("sessionID"),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.name = nameInputRef.current.value;
        formData.sessionID =  localStorage.getItem("sessionID"); // passing it session
        formData.description = descriptionInputRef.current.value;
        createHub();
    };
    
    async function createHub() {
        const url = `${baseUrl}/create-hub`;
        await axios.post(url, JSON.stringify(formData)).then((response) => {
            // console.log(response);
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
                    <input style={{width: "90%", alignSelf: "center"}} type="text" id="name" name="name" placeholder={"Enter Name"} ref={nameInputRef}></input>
                    <br></br>
                    <label style={{color: "black", fontSize: "30px", padding: ".5%"}} htmlFor="description">Description: </label>
                    <input style={{width: "90%", alignSelf: "center"}} type="text" id="description" name="description" placeholder={"Enter Description"} ref={descriptionInputRef}></input>
                    <input style={{width: "10%", alignSelf: "center"}} type="submit"/>
                </form>
            </div>            
        </div>
    );
    
};

export default CreateHub;