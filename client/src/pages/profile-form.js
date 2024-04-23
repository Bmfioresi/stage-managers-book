import React, { useState } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate, Navigate } from "react-router-dom";
import '../css/profile-page.css';
import { toast } from 'react-toastify';

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
        const { name, value } = e.target;
        let sanitizedValue = value;

        switch (name) {
            case 'name':
            case 'roles':
            case 'pronouns':
                // Strip out any script tags or HTML tags to prevent XSS
                sanitizedValue = sanitizedValue.replace(/<\/?[^>]+(>|$)/g, "");
                break;
            case 'bio':
                // Remove all HTML tags from bio, allowing only plain text
                sanitizedValue = sanitizedValue.replace(/<\/?[^>]+(>|$)/g, "");
                break;
            case 'email':
                // Trim spaces and remove any illegal characters that are not typically found in emails
                sanitizedValue = sanitizedValue.trim().replace(/[^a-zA-Z0-9@._-]/g, '');
                break;
            case 'phoneNumber':
                // Ensure only numbers are entered, remove any other characters
                sanitizedValue = sanitizedValue.replace(/\D/g, '');
                break;
            default:
                break;
        }

        setFormData({
            ...formData,
            [name]: sanitizedValue
        });
    };

    const validateForm = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPhone = /^\d{10}$/;

        if (formData.email && !regexEmail.test(formData.email)) {
            toast.error("Invalid email format");
            return false;
        }
        if (formData.phoneNumber && !regexPhone.test(formData.phoneNumber)) {
            toast.error("Phone number must be 10 digits");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const url = 'http://localhost:8000/createProfile';

        // Sending POST request to create profile
        axios.post(url, JSON.stringify(formData)).then((response) => {

            // Updating current userID
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
                        </div>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="profile-button">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
