import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import '../css/new-profile-page.css';
import ProfileEdit from './profile-edit.js'; // Import the ProfileEdit component

const ProfilePage = () => {

    const [name, setName] = useState("NAME");
    const [bio, setBio] = useState("BIO TEXT");
    const [email, setEmail] = useState("EMAIL ADDRESS");
    const [phoneNumber, setPhoneNumber] = useState("PHONE NUMBER");
    const [pronouns, setPronouns] = useState("PRONOUNS");
    const [roles, setRoles] = useState("ROLES");
    const [uid, setUid] = useState("-1");

    const [isEditing, setIsEditing] = useState(false);

    function formatPhoneNumber(phoneNumberString) { // Formats phone number to (xxx)-xxx-xxxx
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]})-${match[2]}-${match[3]}`;
        }
        return null;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const [formData, setFormData] = useState({
        sessionID: "-1"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {

        const url = 'http://localhost:8000/updateProfile';

        // Combining formData with userID
        const allData = {
            name: formData.name, bio: formData.bio, phoneNumber: formData.phoneNumber, pronouns: formData.pronouns,
            email: formData.email, roles: formData.roles, sessionID: localStorage.getItem('sessionID')
        };

        axios.post(url, JSON.stringify(allData)).then((response) => {

            localStorage.setItem('uid', response.data.uid);
            // Update local state variables immediately
            setName(formData.name);
            setBio(formData.bio);
            setEmail(formData.email);
            setPhoneNumber(formData.phoneNumber);
            setPronouns(formData.pronouns);
            setRoles(formData.roles);
            setIsEditing(false); // Exit edit mode after saving changes
        });

        // Displaying newly created profile
        //console.log("About to redirect to profile");
        return <Navigate to='/profile' />;

    }

    useEffect(() => {
        const url = 'http://localhost:8000/loadProfile';
        // Preparing data to send to axios
        setFormData({ ...formData, sessionID: localStorage.getItem("sessionID") });

        axios.post(url, JSON.stringify({ "sessionID": localStorage.getItem("sessionID") })).then((response) => {

            // Updating data
            setName(response.data.name);
            setBio(response.data.bio);
            setEmail(response.data.email_address);
            setPhoneNumber(response.data.phone_number);
            setPronouns(response.data.pronouns);
            setRoles(response.data.roles);
        });

    }, []);

    return (
        <div className='body-screen'>
            <div className="ui-container" id="ui-container-style">
                <div className="container-style">
                    <div className="profile-content"><img src="https://source.unsplash.com/600x600/?abstract" alt="Profile Picture" className="profile-pic-style" />
                        <h1 className="header-style" htmlFor="name">{name}</h1>
                        <p className="subtitle" htmlFor="roles">{roles}</p>
                        <p className="subtitle" htmlFor="pronouns">{pronouns}</p>
                    </div>
                    <div className="bio">
                        <h2 className="header-style">Bio</h2>
                        <p className="description-style" htmlFor="bio">{bio}</p>
                    </div>
                    <div className="contact-info">
                        <h2 className="header-style">Contact Information</h2>
                        <p className="description-style" htmlFor="email">{email}</p>
                        <p className="description-style" htmlFor="phoneNumber">{formatPhoneNumber(phoneNumber)}</p>
                    </div>
                    <div className="gallery">
                        <h2 className="header-style">Gallery</h2>
                        <div className="grid-style">
                            <img src="https://source.unsplash.com/600x600/?abstract" alt="Gallery Image" className="gallery-image-style" />
                            <img src="https://source.unsplash.com/600x600/?abstract" alt="Gallery Image" className="gallery-image-style" />
                            <img src="https://source.unsplash.com/600x600/?abstract" alt="Gallery Image" className="gallery-image-style" />
                        </div>
                    </div>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <ProfileEdit formData={formData} onChange={handleChange} />
                            <button type="button" onClick={handleCancelClick}>Cancel</button>
                        </form>
                    ) : (
                        <button className="profile-button" onClick={handleEditClick}>Edit Profile</button>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
