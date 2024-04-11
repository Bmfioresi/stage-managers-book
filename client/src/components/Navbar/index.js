import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./elements";
import axios from 'axios';


const NavBar = () => {
    const baseUrl = "http://localhost:8000";
    const navigate = useNavigate();
    const [hubsVisible, setHubsVisible] = useState(false);
    const [formData, setFormData] = useState({sessionID: localStorage.sessionID});
    const [hubs, setHubs] = useState([]);
    const [joinHubMessage, setJoinHubMessage] = useState("");
    

    async function getHubs() {
        const url = `${baseUrl}/hubs`;;
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
        let path = `/hubs/create-hub`; 
        navigate(path);
    }

    async function joinHub(event) {
        event.preventDefault();
        if (event.target[0].value === "") {
            setJoinHubMessage("Please enter an access code");
            return;
        }
        let url = `${baseUrl}/loadProfile`;
        let profile = await axios.post(url, JSON.stringify(formData));
        url = `${baseUrl}/add-join-request?accessCode=${event.target[0].value}&uid=${profile.data.uid}`;
        let ret = await axios.get(url);
        if (ret.data.status === 200) setJoinHubMessage("Request to join sent successfully");
        if (ret.data.status === 403) setJoinHubMessage("Request already sent");
        if (ret.data.status === 404) setJoinHubMessage("Hub not found");
        if (ret.data.status === 406) setJoinHubMessage("Banned from this hub");
        if (ret.data.status === 409) setJoinHubMessage("Already a member of this hub");
        if (ret.data.status === 500 || ret.status !== 200) setJoinHubMessage("Something went wrong");
    }

    async function loadHubs() {
        setJoinHubMessage("");
        setHubsVisible(true);
    }

    if((localStorage.getItem("sessionID") == -1) || (localStorage.getItem("sessionID") == null)) {
        return (
            <>
                <h1 style={{color: "blue"}}>{localStorage.getItem("sessionID")}</h1>
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
                        <NavLink to="/createProfile">Create Profile</NavLink>
                        <NavLink to="/editProfile">Edit Profile</NavLink>
                        <NavLink
                            onMouseEnter={() => loadHubs()}
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
                                    onMouseEnter={() => loadHubs()}
                                    to={`/hubs/${hub.hid}`}>
                                    {hub.name}
                                    </NavLink>
                                ))}
                                <button
                                    onMouseEnter={() => loadHubs()}
                                    onClick={createHub}>
                                    Create New Hub +
                                </button>
                                <br/><br/>
                                <form onSubmit={joinHub}>
                                    <input type="text" placeholder="Enter Access Code"></input>
                                    <button type="submit">Join New Hub</button>
                                </form>
                                <p style={{color:"white"}}>{joinHubMessage}</p>
                            </ul>
                        )}
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/unit-tests">Unit Tests</NavLink>
                        <NavLink to="/createAccount">Create Account</NavLink>
                    </NavMenu>
                </Nav>
            </>
        );
    }

    
};

export default NavBar;