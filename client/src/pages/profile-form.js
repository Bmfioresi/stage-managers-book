import React, { useState } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate, Navigate } from "react-router-dom";
import './profile-page.css';

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        phoneNumber: '',
        pronouns: '',
        email: '',
        roles: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        console.log(formData);

        const url = 'http://localhost:8000/createProfile';
        // Converting form to json format

        axios.post(url, JSON.stringify(formData)).then((response) => {
            
            console.log("NEW LOCAL STORAGE UID");
            console.log(response.data.uid);
            localStorage.setItem('uid', response.data.uid);

            console.log("LOCAL STORAGE");
            // console.log(JSON.parse(localStorage.getItem("uid")))
        });
        return <Navigate to='/profile' />;

    }

    return (

        <div className="container">
            <div className="sidebar">
                {/* Sidebar content */}
                <img src="smb-logo.png" alt="Stage Manager Logo" className="logo" />
                <ul className="sidebar-links">
                    <li><a href="#">Profile</a></li>
                    <li>
                        <a href="#">Productions</a>
                        <ul className="dropdown">
                            <li><a href="#">Play 1</a></li>
                            <li><a href="#">Play 2</a></li>
                            <li><a href="#">Play 3</a></li>
                            <li><a href="#">Play 4</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Calendar</a></li>
                </ul>
            </div>
            <div className="content">
                {/* Main content */}
                <h1>User Profile</h1>
                <div className="profile-info">
                    <div className="profile-details">
                        <h2>Basic Information</h2>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        <label htmlFor="pronouns">Pronouns:</label>
                        <input type="text" id="pronouns" name="pronouns" value={formData.pronouns} onChange={handleChange} />
                        <label htmlFor="roles">Roles:</label>
                        <input type="text" id="roles" name="roles" value={formData.roles} onChange={handleChange} />
                    </div>
                    <div className="about-me">
                        <h2>About Me</h2>
                        <label htmlFor="bio">Bio:</label>
                        <textarea id="bio" name="bio" rows="4" cols="50" value={formData.bio} onChange={handleChange}></textarea>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        <label htmlFor="email">Email Address:</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {/* <label htmlFor="resume">Resume:</label>
                        <input type="text" id="resume" name="resume" value={formData.resume} onChange={handleChange} /> */}
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}>Save Changes</button>
            </div>
        </div>

    );
};

export default ProfileForm;
