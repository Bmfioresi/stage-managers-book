import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import axios from 'axios';
import './profile-page.css';

const ProfilePage = () => {

    const [name, setName] = useState("NAME");
    const [bio, setBio] = useState("BIO TEXT");
    const [email, setEmail] = useState("EMAIL ADDRESS");
    const [phoneNumber, setPhoneNumber] = useState("PHONE NUMBER");
    const [pronouns, setPronouns] = useState("PRONOUNS");
    const [roles, setRoles] = useState("ROLES");
    const [uid, setUid] = useState("-1");

    useEffect(() => {
        setUid(localStorage.uid);

        const url = 'http://localhost:8000/loadProfile';
        // Converting form to json format

        console.log("LOCAL STORAGE.uid");
        console.log(uid);
        axios.post(url, JSON.stringify({ uid: '01' })).then((response) => {

            console.log("BACK TO PROFILE PAGE")
            console.log(response.data);

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
                <h1>User Profile</h1>
                <div className="profile-info">
                    <div className="profile-details">
                        <label htmlFor="name">Name: {name}</label><br /><br />
                        <label htmlFor="pronouns">Preferred Pronouns:{pronouns} </label><br /><br />
                        <label htmlFor="roles">Roles: {roles}</label><br /><br />
                    </div>

                    <div className="about-me">
                        <label htmlFor="bio">Bio: {bio}</label><br />
                        <label htmlFor="email">Email: {email}</label><br />
                        <label htmlFor="phoneNumber">Phone Number: {phoneNumber}</label><br />
                    </div>


                    {/* <label htmlFor="name">Name: </label>
                    <span>{name}</span> <br /> */}

                    {/* <label htmlFor="bio">Bio: </label>
                    <span>{bio}</span> <br /> */}

                    {/* <label htmlFor="email">Email Address: </label>
                    <span>{email}</span> <br /> */}

                    {/* <label htmlFor="phoneNumber">Phone Number: </label>
                    <span>{phoneNumber}</span> <br /> */}

                    {/* <label htmlFor="pronouns">Preferred Pronouns: </label>
                    <span>{pronouns}</span> <br /> */}

                    {/* <label htmlFor="roles">Roles: </label>
                    <span>{roles}</span> <br /> */}

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
