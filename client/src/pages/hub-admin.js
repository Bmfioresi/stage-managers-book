import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";
import { NavLink } from "../components/Navbar/elements";
import '../css/hub-pages.css';

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
        const url = 'http://localhost:8000/hub-individual';
        await axios.post(url, JSON.stringify(formData)).then((response => {
          setName(response.data[0].name);
          setDescription(response.data[0].description);
          setOwner(response.data[0].owner);
          setAnnouncements(response.data[0].announcements);
          whitelist = response.data[0].whitelist;
        }));
    }

    async function retrieveMembers() {
      await getHubInfo();
      const url = 'http://localhost:8000/retrieve-members';
      let data = await axios.post(url, JSON.stringify(whitelist));
      await setMembers(data.data);
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
                    <p key={member.name} className="regular-text">{member.name}</p>
                ))}
            </div>
            <div className="overview">
                <h1 className="cat-header">Announcements</h1>
                {/* {announcements.map((announcement) => (
                    <p key={announcement} className="regular-text">{announcement}</p>
                ))} */}
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