import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";
import { NavLink } from "../components/Navbar/elements";
import '../css/hub-pages.css';

const baseUrl = 'http://localhost:8000';

function HubAdmin() {
    let whitelist = [];
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState([]);
    const [owner, setOwner] = useState("");
    const [announcements, setAnnouncements] = useState([]);

    const formData = {hid: params.hub};

    async function getHubInfo() {
        const url = `${baseUrl}/hub-individual`;
        await axios.post(url, JSON.stringify(formData)).then((response => {
          setName(response.data[0].name);
          setDescription(response.data[0].description);
          setOwner(response.data[0].owner);
          setAnnouncements(response.data[0].announcements);
          console.log(response.data[0].announcements);
          whitelist = response.data[0].whitelist;
        }));
    }

    async function retrieveMembers() {
      await getHubInfo();
      const url = `${baseUrl}/retrieve-members`;
      console.log(whitelist);
      let data = await axios.post(url, JSON.stringify(whitelist));
      await setMembers(data.data);
    }

    async function kickUser(uid) {
        const url = `${baseUrl}/update-whitelist?hid=${formData.hid}&uid=${uid}`;
        await axios.get(url).then((response) => {
            console.log(response);
        });
        await retrieveMembers();
    }

    async function banUser(uid) {
        await kickUser(uid);
        const url = `${baseUrl}/update-blacklist?hid=${formData.hid}&uid=${uid}`;
        console.log(url);
        await axios.get(url).then((response) => {
            console.log(response);
        });
        await retrieveMembers();
    }

    useEffect(() => {
        retrieveMembers().then();
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
                            <button type="button" onClick={() => banUser(member.uid)}>Ban</button>
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
                <h1 className="cat-header">Join Requests</h1>
            </div>
            
        </div>
    );
}

export default HubAdmin;