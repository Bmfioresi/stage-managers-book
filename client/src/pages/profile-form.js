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
    const [toProfile, setToProfile] = useState("FALSE");

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

        // Sending POST request to create profile
        axios.post(url, JSON.stringify(formData)).then((response) => {

            // Updating current userID
            console.log("NEW LOCAL STORAGE UID");
            console.log(response.data.uid);
            localStorage.setItem('uid', response.data.uid);
            setToProfile("TRUE");
        });
    }

    if (toProfile == "TRUE") {
        return <Navigate to='/profile' />;
    }

    return (
        <div className='right-side'>
        <div className="container">
            <div className="content">
                {/* Main content */}
                <h1 className="profile-h1">User Profile</h1>
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
                <button type="submit" onClick={handleSubmit} className="profile-button">Save Changes</button>
            </div>
        </div>
        </div>
    );
};

export default ProfileForm;
