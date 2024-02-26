import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import axios from 'axios';
import './profile-page.css';

const Profile = () => {

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

        axios.post(url, JSON.stringify({uid: uid})).then((response) => {

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

    }, [] );

    return (
        <div class="container">
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
    );
};

export default Profile;
