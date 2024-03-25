// following this tutorial: https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

import React, { useState, useEffect } from "react";
import { Nav, NavLink, NavMenu } from "./elements";
import axios from 'axios';


const NavBar = () => {
    const [hubsVisible, setHubsVisible] = useState(false);
    const [formData, setFormData] = useState({uid: "01"});
    const [hubs, setHubs] = useState([]);

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

    async function dummyFunc() {

    }

    return (
        <>
            <Nav>
                <NavMenu onMouseLeave={() => setHubsVisible(false)}>
                    <NavLink to="/"><img style={{width: "70%"}}
                        loading="eager"
                        alt=""
                        src="/smb-logo.png"
                    /></NavLink><br></br>
                    {/* <NavLink to="/test">Test</NavLink> */}
                    <NavLink to="/upload-image">Upload Image</NavLink>
                    <NavLink to="/display-image">Display Image</NavLink>
                    <NavLink to="/login">Login</NavLink>
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
                                key={hub.hid}
                                onMouseEnter={() => setHubsVisible(true)}
                                onMouseLeave={() => setHubsVisible(false)}
                                to={`/hubs/${hub.hid}`}>
                                {hub.name}
                                </NavLink>
                            ))}
                            <button
                                onMouseEnter={() => setHubsVisible(true)}
                                onMouseLeave={() => setHubsVisible(false)}
                                onClick={dummyFunc}>
                                Create New Hub +
                            </button>
                        </ul>
                    )}
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/script">Display Script</NavLink>
                    <NavLink to="/unit-tests">Unit Tests</NavLink>
                    <NavLink to="/createAccount">Create Account</NavLink>
                    {/* <NavLink to="/signin">Hannah's Links</NavLink> */}
                    {/* <NavLink to="/signup">Sign Up</NavLink>
                    <NavLink to="/forgotpassword">Forgot Password</NavLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;