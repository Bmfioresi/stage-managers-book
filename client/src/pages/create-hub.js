import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "../components/Navbar/elements";
import axios from 'axios';
import '../css/pages.css';
import '../css/hub-pages.css';
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:8000";

const sanitizeInput = (input) => {
    // Remove any script tags or HTML tags to prevent XSS
    return input.replace(/<\/?[^>]+(>|$)/g, "");
};

const validateInput = (input, type) => {
    switch (type) {
        case 'name':
            return input.trim().length > 0 && input.trim().length <= 300; // I know this is a bit long, but production names can be long
        case 'description':
            return input.trim().length <= 500;
        default:
            return true;
    }
};

const CreateHub = () => {
    const navigate = useNavigate();
    const nameInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    var formData = {
        name: 'Default',
        description: 'Default',
        sessionID: localStorage.getItem("sessionID"),
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     formData.name = nameInputRef.current.value;
    //     formData.sessionID =  localStorage.getItem("sessionID"); // passing it session
    //     formData.description = descriptionInputRef.current.value;
    //     createHub();
    // };

    // What's new -->
    const handleSubmit = (e) => {
        e.preventDefault();
    
        let name = sanitizeInput(nameInputRef.current.value);
        let description = sanitizeInput(descriptionInputRef.current.value);
    
        if (!validateInput(name, 'name')) {
            toast.error("Invalid name: Name cannot be empty and must be under 300 characters.");
            return;
        }
    
        if (!validateInput(description, 'description')) {
            toast.error("Invalid description: Description must be under 500 characters.");
            return;
        }
    
        formData = {
            ...formData,
            name: name,
            description: description,
            sessionID: localStorage.getItem("sessionID")
        };
    
        createHub();
    };
    // <-- What's new    
    
    async function createHub() {
        const url = `${baseUrl}/create-hub`;
        await axios.post(url, JSON.stringify(formData)).then((response) => {
            //console.log(response);
            let path = `/hubs/${response.data.hid}`; 
            //toast.success("Hub created successfully");
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