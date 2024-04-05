import React, { useState, useEffect } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate, Navigate } from "react-router-dom";
import '../css/profile-page.css';
import '../css/pages.css';

const ProfileEdit = () => {
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

        const url = 'http://localhost:8000/updateProfile';

        // Combining formData with userID
        const allData = {
            name: formData.name, bio: formData.bio, phoneNumber: formData.phoneNumber, pronouns: formData.pronouns,
            email: formData.email, roles: formData.roles, sessionID: localStorage.getItem('sessionID')
        };

        console.log("Trying to change profile");
        console.log(allData);

        axios.post(url, JSON.stringify(allData)).then((response) => {

            // TODO: Modify function so this only includes error handling
            console.log("NEW LOCAL STORAGE UID EDIT PROFILE");
            console.log(response.data.uid);
            setToProfile("TRUE");
            localStorage.setItem('uid', response.data.uid);
        });

        // Displaying newly created profile
        console.log("About to redirect to profile");
        return <Navigate to='/profile' />;

    }

    useEffect(() => {
        // Loading current profile into template
        var thisSessionID = localStorage.getItem('sessionID');
        console.log("ABOUT TO SEND POST REQUEST HERE");
        axios.post('http://localhost:8000/loadProfile', JSON.stringify({ sessionID: thisSessionID })).then((response) => {

            console.log("BACK TO PROFILE EDIT PAGE")
            console.log(response.data);

            // Updating data
            setFormData({
                ...formData, name: response.data.name, roles: response.data.roles, pronouns: response.data.pronouns,
                bio: response.data.bio, email: response.data.email, phoneNumber: response.data.phone_number
            });
            console.log("UPDATED FORM DATAS");
            console.log(formData);
            // setFormData(name, response.data.name);
            // setFormData(bio, response.data.bio);
            // setFormData(email, response.data.email_address);
            // setFormData(phoneNumber, response.data.phone_number);
            // setFormData(pronouns, response.data.pronouns);
            // setFormData(roles, response.data.roles);
        });

    }, []);

    if (toProfile == "TRUE") {
        return <Navigate to='/profile' />;
    }

    return (
        <div className='right-side'>
        <div className="container">
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
        </div>
    );
};

export default ProfileEdit;
