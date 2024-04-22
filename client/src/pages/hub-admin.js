import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";
import { NavLink } from "../components/Navbar/elements";
import '../css/hub-pages.css';

const baseUrl = 'http://localhost:8000';

function HubAdmin() {
    const announcementRef = useRef(null);
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    let joinRequests = [];
    let whitelist = [];
    let blacklist = [];
    let navigate = useNavigate();
    const params = useParams();
    var newName;
    var newDescription;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState([]);
    const [bannedMembers, setBannedMembers] = useState([]);
    let owneruid = "";
    const [announcements, setAnnouncements] = useState([]);
    const [joinRequestMembers, setJoinRequestMembers] = useState([])
    const [accessCode, setAccessCode] = useState("");
    const [access, setAccess] = useState(false);

    const formData = {hid: Number(params.hub)};

    async function getHubInfo() {
        const url = `${baseUrl}/hub-individual`;
        await axios.post(url, JSON.stringify(formData)).then((response => {
          setName(response.data[0].name);
          setDescription(response.data[0].description);
          owneruid = response.data[0].owner;
          setAnnouncements(response.data[0].announcements);
          setAccessCode(response.data[0].access_code);
          joinRequests = response.data[0].join_requests;
        //   console.log(response.data[0].whitelist);
          whitelist = response.data[0].whitelist;
          blacklist = response.data[0].blacklist;
        }));
    }

    async function checkAdmin() {
        let url = `${baseUrl}/loadProfile`;
        let profile = await axios.post(url, JSON.stringify({sessionID: localStorage.getItem("sessionID")}));
        return profile.data.uid === owneruid;
    }

    async function retrieveMembers() {
        await getHubInfo();
        let isAdmin = await checkAdmin();
        // console.log(isAdmin);
        if (!isAdmin) navigate(`/hubs/${params.hub}`);
        else await setAccess(true);
        
        const url = `${baseUrl}/retrieve-members`;
        let data = await axios.post(url, JSON.stringify(whitelist));
        await setMembers(data.data);
        data = await axios.post(url, JSON.stringify(blacklist));
        await setBannedMembers(data.data);
        data = await axios.post(url, JSON.stringify(joinRequests));
        await setJoinRequestMembers(data.data);
    }

    async function removeJoinRequest(uid) {
        const url = `${baseUrl}/remove-join-request?hid=${formData.hid}&uid=${uid}`;
        await axios.get(url);
        await retrieveMembers();
    }

    async function admitUser(uid) {
        const url = `${baseUrl}/add-member?hid=${formData.hid}&uid=${uid}`;
        await axios.get(url);
        await removeJoinRequest(uid);
    }

    async function kickUser(uid) {
        const url = `${baseUrl}/kick-member?hid=${formData.hid}&uid=${uid}`;
        await axios.get(url);
        await retrieveMembers();
    }

    async function banUser(uid, exists) {
        if (exists) await kickUser(uid);
        else await removeJoinRequest(uid);
        const url = `${baseUrl}/ban-member?hid=${formData.hid}&uid=${uid}`;
        await axios.get(url);
        await retrieveMembers();
    }

    async function unbanUser(uid) {
        const url = `${baseUrl}/unban-member?hid=${formData.hid}&uid=${uid}`;
        await axios.get(url);
        await retrieveMembers();
    }

    useEffect(() => {
        try {
            retrieveMembers();
        } catch (err) {
            console.log(err);
        }
    }, []);

    async function addAnnouncement() {
        const url = `${baseUrl}/add-announcement`;
        axios.post(url, JSON.stringify({hid: Number(params.hub), announcement: announcementRef.current.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${baseUrl}/update-hub`;
        let data = {
            hid: params.hub,
            name: nameRef.current.value,
            description: descriptionRef.current.value
        }
        axios.post(url, JSON.stringify(data));
        window.location.reload();
    };

    return(
        <div className="bucket">
            {access && <div>
            <div className="hub-title">
                <h1 className="cat-header">Admin Control For {name}</h1>
            </div>
            <div className="members">
                <h1 className="cat-header">Current Members</h1>
                {members.map((member) => (
                    <p key={member.name} className="regular-text">
                        {member.name} 
                        <button type="button" onClick={() => kickUser(member.uid)}>Kick</button>
                        <button type="button" onClick={() => banUser(member.uid, true)}>Ban</button>
                    </p>
                ))}
                <h1 className="cat-header">Banned Members</h1>
                {bannedMembers.map((member) => (
                    <p key={member.name} className="regular-text">
                        {member.name} 
                        <button type="button" onClick={() => unbanUser(member.uid)}>Unban</button>
                    </p>
                ))}
            </div>
            <div className="overview">
                <h1 className="cat-header">Announcements</h1>
                {announcements.map((announcement) => (
                    <li key={announcement} className="regular-text">{announcement}</li>
                ))}
            </div>
            <div className="links">
                <h1 className="cat-header">Make an Announcement</h1>
                <form onSubmit={addAnnouncement}>
                    <input 
                        name="announce"
                        style={{
                            width: "90%",
                            alignSelf: "center"
                        }}
                        ref={announcementRef}
                    />
                    <button
                        style={{
                            height: "10%",
                            alignSelf: "center"
                        }}
                        type="submit">
                        Add
                    </button>
                </form>
            </div>
            <div className="schedule">
                <h1 className="cat-header">Edit hub info:</h1>
                <form onSubmit={handleSubmit}>
                    <label style={{color: "black", fontSize: "15px"}} htmlFor="name">Name: </label>
                    <input style={{width: "90%", alignSelf: "center", height:"5px"}} type="text" id="name" name="name" placeholder={"Enter Name"} ref={nameRef}></input>
                    <label style={{color: "black", fontSize: "15px"}} htmlFor="description">Description: </label>
                    <input style={{width: "90%", alignSelf: "center", height:"5px"}} type="text" id="description" name="description" placeholder={"Enter Description"} ref={descriptionRef}></input>
                    <input style={{width: "40%", alignSelf: "center"}} type="submit"/>
                </form>
            </div>
            <div className="notifications">
                <h1 className="cat-header">Join Requests <button onClick={retrieveMembers}>Refresh</button></h1>
                {joinRequestMembers.map((member) => (
                    <div>
                        <p key={member.name} className="regular-text">
                            {member.name}
                            <button type="button" onClick={() => admitUser(member.uid)}>Admit</button>
                            <button type="button" onClick={() => removeJoinRequest(member.uid)}>Deny</button>
                            <button type="button" onClick={() => banUser(member.uid, false)}>Ban</button>
                        </p>
                    </div>
                ))}
                <h1 className="cat-header">Access Code: {accessCode}</h1>
            </div>
            </div>}
        </div>
    );
}

export default HubAdmin;