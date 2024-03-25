import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import axios from 'axios';
import './pages.css';

const Profile = () => {

    const [name, setName] = useState("NAME");
    const [bio, setBio] = useState("BIO TEXT");
    const [email, setEmail] = useState("EMAIL ADDRESS");
    const [phoneNumber, setPhoneNumber] = useState("PHONE NUMBER");
    const [pronouns, setPronouns] = useState("PRONOUNS");
    const [roles, setRoles] = useState("ROLES");


    return (
        <div className='right-side'>
        <div>
            <h1>User Profile</h1>
            <body>
                <label htmlFor="name">Name: </label>
                <span>{name}</span> <br />

                <label htmlFor="bio">Bio: </label>
                <span>{bio}</span> <br />

                <label htmlFor="email">Email Address: </label>
                <span>{email}</span> <br />

                <label htmlFor="phoneNumber">Phone Number: </label>
                <span>{phoneNumber}</span> <br />

                <label htmlFor="pronouns">Preferred Pronouns: </label>
                <span>{pronouns}</span> <br />

                <label htmlFor="roles">Roles: </label>
                <span>{roles}</span> <br />

            </body>
        </div>
        </div>
    );
};

export default Profile;
