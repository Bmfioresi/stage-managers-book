import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";
import '../css/hub-pages.css';
// import checkLoggedIn from "./check-logged-in";

const baseUrl = "http://localhost:8000"

function HubIndividual() {
    // let loggedIn = checkLoggedIn();
    let whitelist = [];
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    var owner;
    const [ownerName, setOwnerName] = useState("");
    const [access, setAccess] = useState(false);

    // const [formData, setFormData] = useState({
    //   hid: "01"
    // });

    const formData = {hid: Number(params.hub)};

    async function getHubInfo() {
        const url = `${baseUrl}/hub-individual`;
        await axios.post(url, JSON.stringify(formData)).then((response => {
          // console.log(response);
          setName(response.data[0].name);
          setDescription(response.data[0].description);
          setAnnouncements(response.data[0].announcements);
          owner = response.data[0].owner;
          whitelist = response.data[0].whitelist;
        }));
    }

    async function routeChange(destination) { 
      let path = `/hubs/${formData.hid}/${destination}`; 
      navigate(path);
    }

    async function checkAdmin() {
      let url = `${baseUrl}/loadProfile`;
      let profile = await axios.post(url, JSON.stringify({sessionID: localStorage.sessionID}));
      setAccess(profile.data.uid === owner);
    }

    async function retrieveMembers() {
      // let loggedIn = await checkLoggedIn();
      // if(!loggedIn) {
      //   let path = `/`; 
      //   navigate(path);
      // }
      await getHubInfo();
      await checkAdmin();
      const url = `${baseUrl}/retrieve-members`;
      let data = await axios.post(url, JSON.stringify(whitelist));
      await setMembers(data.data);
      data = await axios.post(url, JSON.stringify([owner]));
      await setOwnerName(data.data[0].name);
    }

    useEffect(() => {
        retrieveMembers().then();
    }, []);

    return (
        <div className="bucket">
          <div className="hub-title">
            <h1 className="cat-header">{name}</h1>
          </div>
          <div className="members">
            <h1 className="cat-header">Members</h1>
            <p className="regular-text">{ownerName} (Owner)</p>
            {members.map((member) => (
                <p key={member.name} className="regular-text">{member.name}</p>
            ))}
          </div>
          <div className="overview">
            <h1 className="cat-header">Overview</h1>
            <p className="regular-text">{description}</p>
          </div>
          <div className="links">
            <h1 className="cat-header">Links</h1>
            <button className="hubs-button" onClick={() => routeChange("resources")}>Resources</button>
            <button className="hubs-button" onClick={() => routeChange("designer")}>Designer</button>
            <button className="hubs-button" onClick={() => routeChange("scripts")}>Scripts</button>
            {access && <button className="hubs-button" onClick={() => routeChange("admin")}>Admin Access</button>}
          </div>
          <div className="schedule">
            <h1 className="cat-header">Schedule</h1>
          </div>
          <div className="notifications">
            <h1 className="cat-header">Announcements</h1>
            {announcements.map((announcement) => (
              <p key={announcement} className="regular-text">{announcement}</p>
            ))}
          </div>
        </div>
    );
}

export default HubIndividual;