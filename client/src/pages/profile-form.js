import React, { useState } from 'react';
import './profile-page.css';

const ProfileForm = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code to handle form submission (e.g., save data to MongoDB)
        console.log(formData); // For demonstration purposes
    };

    return (

        <div className="container">
            <div className="sidebar">
                {/* Sidebar content */}
                <img src="path_to_logo_image" alt="Stage Manager Logo" className="logo" />
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
                        <label htmlFor="contact_info">Contact Info:</label>
                        <input type="text" id="contact_info" name="contact_info" value={formData.contact_info} onChange={handleChange} />
                        <label htmlFor="emergency_contact">Emergency Contact:</label>
                        <input type="text" id="emergency_contact" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} />
                        <label htmlFor="resume">Resume:</label>
                        <input type="text" id="resume" name="resume" value={formData.resume} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}>Save Changes</button>
            </div>
           </div> 


        // <div class="container">
        //     <h1>User Profile</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="name">Name:</label>
        //         <input type="text" id="name" name="name" value={"First Last"} onChange={handleChange} /><br />

        //         <label htmlFor="bio">Bio:</label>
        //         <textarea id="bio" name="bio" rows="4" cols="50" value={"I am very creative"} onChange={handleChange}></textarea><br />

        //         <label htmlFor="contact_info">Contact Info:</label>
        //         <input type="text" id="contact_info" name="contact_info" value={"123-456-7890"} onChange={handleChange} /><br />

        //         <label htmlFor="pronouns">Pronouns:</label>
        //         <input type="text" id="pronouns" name="pronouns" value={"any/all"} onChange={handleChange} /><br />

        //         <label htmlFor="emergency_contact">Emergency Contact:</label>
        //         <input type="text" id="emergency_contact" name="emergency_contact" value={"911"} onChange={handleChange} /><br />

        //         <label htmlFor="roles">Roles:</label>
        //         <input type="text" id="roles" name="roles" value={"Actor"} onChange={handleChange} /><br />

        //         <label htmlFor="resume">Resume:</label>
        //         <input type="text" id="resume" name="resume" value={"resume.com/myresume"} onChange={handleChange} /><br />

        //         <button type="submit">Save Changes</button>
        //     </form>
        // </div>
    );
};

export default ProfileForm;
