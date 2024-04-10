// following this tutorial: https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./elements";
import axios from 'axios';


const NavBar = () => {
    const navigate = useNavigate();
    const [hubsVisible, setHubsVisible] = useState(false);
    const [formData, setFormData] = useState({sessionID: localStorage.sessionID});
    const [hubs, setHubs] = useState([]);
    const [hubName, setName] = useState("Default name");
    const [hubDescription, setDescription] = useState("Default description");

    async function getHubs() {
        const url = 'http://localhost:8000/hubs';
        axios.post(url, JSON.stringify(formData)).then((response) => {
          const hubTemp = [];
          for(let i = 0; i < response.data.length; i++) {
            hubTemp.push({name: response.data[i].name, description: response.data[i].description, owner: response.data[i].owner, hid: response.data[i].hid});
          }
          setHubs(hubTemp);
        });
    }

    useEffect(() => {
        getHubs().then();
    }, []);

    async function createHub() {
        const url = 'http://localhost:8000/create-hub';
        let newHub = {
            name: hubName,
            owner: localStorage.sessionID,
            description: hubDescription
        };
        axios.post(url, JSON.stringify(newHub)).then((response) => {
            console.log(response);
            let path = `/hubs/${response.data}`; 
            navigate(path);
        });
    }

    if((localStorage.getItem("sessionID") == -1) || (localStorage.getItem("sessionID") == null)) {
        return (
            <>
                <Nav>
                    <NavMenu onMouseLeave={() => setHubsVisible(false)}>
                        <NavLink to="/"><img style={{width: "100%", height: "200%", objectFit: "contain"}}
                            loading="eager"
                            alt=""
                            src="/smb-logo.png"
                        /></NavLink><br></br><br></br><br></br>
                    </NavMenu>
                </Nav>
            </>
        );
    }
    else {
        return (
            <>
                <Nav>
                    <NavMenu onMouseLeave={() => setHubsVisible(false)}>
                        <NavLink to="/"><img style={{width: "100%", height: "200%", objectFit: "contain"}}
                            loading="eager"
                            alt=""
                            src="/smb-logo.png"
                        /></NavLink><br></br><br></br><br></br>
                        {/* <NavLink to="/test">Test</NavLink> */}
                        {/* <NavLink to="/upload-image">Upload Image</NavLink>
                        <NavLink to="/display-image">Display Image</NavLink> */}
                        {/* <NavLink to="/login">Login</NavLink> */}
                        <NavLink to="/createProfile">Create Profile</NavLink>
                        <NavLink to="/editProfile">Edit Profile</NavLink>
                        <NavLink
                            onMouseEnter={() => setHubsVisible(true)}
                            to="/hubs">
                            Hubs
                        </NavLink>
                        {hubsVisible && (
                            <ul>
                                {hubs.map((hub) => (
                                <NavLink
                                    style={{height: "10%"}}
                                    reloadDocument
                                    key={hub.hid}
                                    onMouseEnter={() => setHubsVisible(true)}
                                    to={`/hubs/${hub.hid}`}>
                                    {hub.name}
                                    </NavLink>
                                ))}
                                <button
                                    onMouseEnter={() => setHubsVisible(true)}
                                    onClick={createHub}>
                                    Create New Hub +
                                </button>
                            </ul>
                        )}
                        <NavLink to="/profile">Profile</NavLink>
                        {/* <NavLink to="/script">Display Script</NavLink> */}
                        <NavLink to="/unit-tests">Unit Tests</NavLink>
                        <NavLink to="/createAccount">Create Account</NavLink>
                        {/* <NavLink to="/signin">Hannah's Links</NavLink> */}
                        {/* <NavLink to="/signup">Sign Up</NavLink>
                        <NavLink to="/forgotpassword">Forgot Password</NavLink> */}
                    </NavMenu>
                </Nav>
            </>
        );
    }

    
};

export default NavBar;