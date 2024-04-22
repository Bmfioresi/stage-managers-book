import React, { useState, useEffect } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate, Navigate } from "react-router-dom";
import '../css/new-profile-page.css';
import { toast } from 'react-toastify';

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
        //console.log(formData);
        //console.log(formData);

        const url = 'http://localhost:8000/updateProfile';

        // Combining formData with userID
        const allData = {
            name: formData.name, bio: formData.bio, phoneNumber: formData.phoneNumber, pronouns: formData.pronouns,
            email: formData.email, roles: formData.roles, sessionID: localStorage.getItem('sessionID')
        };

        // console.log("Trying to change profile");
        //console.log(allData);

        axios.post(url, JSON.stringify(allData)).then((response) => {

            // TODO: Modify function so this only includes error handling
            // console.log("NEW LOCAL STORAGE UID EDIT PROFILE");
            // console.log(response.data.uid);
            setToProfile("TRUE");
            localStorage.setItem('uid', response.data.uid);
        });

        // Displaying newly created profile
        //console.log("About to redirect to profile");
        toast.success("Profile updated successfully!");
        return <Navigate to='/profile' />;

    }

    useEffect(() => {
        // Loading current profile into template
        var thisSessionID = localStorage.getItem('sessionID');
        //console.log("ABOUT TO SEND POST REQUEST HERE");
        axios.post('http://localhost:8000/loadProfile', JSON.stringify({ sessionID: thisSessionID })).then((response) => {

            //console.log("BACK TO PROFILE EDIT PAGE")
            //console.log(response.data);

            // Updating data
            setFormData({
                ...formData, name: response.data.name, roles: response.data.roles, pronouns: response.data.pronouns,
                bio: response.data.bio, email: response.data.email_address, phoneNumber: response.data.phone_number
            });
            //console.log("UPDATED FORM DATAS");
            //console.log(formData);
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
        <div className='body-screen'>
            <div className="ui-container" id="ui-container-style-edit">
                <div className="container-style">
                    {/* Main content */}
                    <h1 className="header-style">User Profile</h1>
                    <img src="https://source.unsplash.com/600x600/?abstract" alt="Profile Picture" className="profile-pic-style" />
                    <div className="profile-content">
                        <p>Basic Information</p>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /> <br></br>
                        <label htmlFor="roles">Roles:</label>
                        <input type="text" id="roles" name="roles" value={formData.roles} onChange={handleChange} /> <br></br>
                        <label htmlFor="pronouns">Pronouns:</label>
                        <input type="text" id="pronouns" name="pronouns" value={formData.pronouns} onChange={handleChange} /> <br></br>
                        <label htmlFor="bio">Bio:</label>
                        <textarea id="bio" name="bio" rows="4" cols="50" value={formData.bio} onChange={handleChange}></textarea>
                    </div>
                    <div className="contact-info">
                        <p>Contact Information</p>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /> <br></br>
                        <label htmlFor="email">Email Address:</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {/* <label htmlFor="resume">Resume:</label>
                        <input type="text" id="resume" name="resume" value={formData.resume} onChange={handleChange} /> */}
                    </div>
                    <button type="submit" onClick={handleSubmit} className="profile-button">Save Changes</button>
                    <p>Refresh to see updates!</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
