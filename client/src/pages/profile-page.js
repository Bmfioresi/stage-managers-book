import React, { useState, useEffect } from 'react';
import './profile-page.css';
import axios from 'axios';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        contact_info: '',
        pronouns: '',
        emergency_contact: '',
        roles: '',
        resume: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/" + "-1") //api/profile/" + '65da2b9987488cb482688cb0
            .then((response) => {
                console.log(response)
                //setProfileData(response.data); // Assuming the response contains profile data
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []); //I need to know the specific id of the user for profile page in order to move forward
    //also, what route do I need to connect to for the database? 

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code to handle form submission (e.g., save data to MongoDB)
        console.log(formData); // For demonstration purposes
    };

    return (
        <div class="container">
            <h1>User Profile</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={"First Last"} onChange={handleChange} /><br />

                <label htmlFor="bio">Bio:</label>
                <textarea id="bio" name="bio" rows="4" cols="50" value={"I am very creative"} onChange={handleChange}></textarea><br />

                <label htmlFor="contact_info">Contact Info:</label>
                <input type="text" id="contact_info" name="contact_info" value={"123-456-7890"} onChange={handleChange} /><br />

                <label htmlFor="pronouns">Pronouns:</label>
                <input type="text" id="pronouns" name="pronouns" value={"any/all"} onChange={handleChange} /><br />

                <label htmlFor="emergency_contact">Emergency Contact:</label>
                <input type="text" id="emergency_contact" name="emergency_contact" value={"911"} onChange={handleChange} /><br />

                <label htmlFor="roles">Roles:</label>
                <input type="text" id="roles" name="roles" value={"Actor"} onChange={handleChange} /><br />

                <label htmlFor="resume">Resume:</label>
                <input type="text" id="resume" name="resume" value={"resume.com/myresume"} onChange={handleChange} /><br />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ProfilePage;
