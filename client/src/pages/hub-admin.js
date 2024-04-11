import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";
import { NavLink } from "../components/Navbar/elements";
import '../css/hub-pages.css';

const baseUrl = 'http://localhost:8000';

function HubAdmin() {
    let joinRequests = [];
    let whitelist = [];
    let blacklist = [];
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState([]);
    const [bannedMembers, setBannedMembers] = useState([]);
    const [owner, setOwner] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [joinRequestMembers, setJoinRequestMembers] = useState([])
    const [accessCode, setAccessCode] = useState("");

    const formData = {hid: params.hub};

    async function getHubInfo() {
        const url = `${baseUrl}/hub-individual`;
        await axios.post(url, JSON.stringify(formData)).then((response => {
          setName(response.data[0].name);
          setDescription(response.data[0].description);
          setOwner(response.data[0].owner);
          setAnnouncements(response.data[0].announcements);
          setAccessCode(response.data[0].access_code);
          joinRequests = response.data[0].join_requests;
          whitelist = response.data[0].whitelist;
          blacklist = response.data[0].blacklist;
        }));
    }

    async function retrieveMembers() {
        await getHubInfo();
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

    }

    return(
        <div className="bucket">
            <div className="hub-title">
                <h1 className="cat-header">Admin Control For {name}</h1>
            </div>
            <div className="members">
                <h1 className="cat-header">Current Members</h1>
                {members.map((member) => (
                    <div>
                        <p key={member.name} className="regular-text">
                            {member.name} 
                            <button type="button" onClick={() => kickUser(member.uid)}>Kick</button>
                            <button type="button" onClick={() => banUser(member.uid, true)}>Ban</button>
                        </p>
                    </div>
                ))}
                <h1 className="cat-header">Banned Members</h1>
                {bannedMembers.map((member) => (
                    <div>
                    <p key={member.name} className="regular-text">
                        {member.name} 
                        <button type="button" onClick={() => unbanUser(member.uid)}>Unban</button>
                    </p>
                </div>
                ))}
            </div>
            <div className="overview">
                <h1 className="cat-header">Announcements</h1>
                {announcements.map((announcement) => (
                    <li key={announcement.date} className="regular-text">{announcement.message} ::: {announcement.date}</li>
                ))}
            </div>
            <div className="links">
                <h1 className="cat-header">Make an Announcement</h1>
                <form action={addAnnouncement}>
                    <input 
                        name="announce"
                        style={{
                            width: "90%",
                            alignSelf: "center"
                        }}
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
                <h1 className="cat-header">Schedule</h1>
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
            
        </div>
    );
}

export default HubAdmin;