import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "../components/Navbar/elements";
import axios from 'axios';
import '../css/pages.css';
import '../css/hub-pages.css';

const CreateHub = () => {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:8000";
    const [formData, setFormData] = useState({
        name: 'Default',
        description: 'Default',
        owner: '',
        hid: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    async function createHub() {
        const url = `${baseUrl}/create-hub`;
        setFormData({owner: localStorage.sessionID});
        axios.post(url, JSON.stringify(formData)).then((response) => {
            console.log(response);
        });
    }

    return (
        <div className="bucket">
            <div className="hub-title">
                <form action={handleChange}>
                    <span>
                        <label style={{color: "black", fontSize: "30px", padding: ".5%"}} for="name">Name: </label>
                        <input type="text" id="name" name="fname" placeholder={formData.name} onChange={handleChange}></input>
                    </span>
                </form>
            </div>            
        </div>
    );
    
};

export default CreateHub;