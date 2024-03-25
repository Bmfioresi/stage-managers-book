import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from 'axios';
import './pages.css';

function Hub() {

  let navigate = useNavigate();
  const [hubs, setHubs] = useState([]);

  const [formData, setFormData] = useState({uid: "03"});

  const [redirect, setRedirect] = useState("FALSE");
  
  //const formData = useState({uid:"03"});

  async function routeChange(hid) { 
    let path = `/${hid}`; 
    navigate(path);
  }


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

  async function routeChange(hid) { 
    let path = `/hubs/${hid}`; 
    navigate(path);
  }

  useEffect(() => {
    getHubs().then();
  }, []);

  return (
    <div className="right-side">
    <div key={hubs.name}>
      <h1>Hubs</h1>
      <form>
        <label htmlFor="fname">Join new hub: </label>
        <input type="text" id="code" name="code" placeholder="Enter access code"></input><br></br>
      </form>
      <h2>Hub list:</h2>
      <li>
        {hubs.map((hub) => (
          <button key={hub.hid} onClick={() => routeChange(hub.hid)}>{hub.name}<br></br>{hub.owner}<br></br>{hub.description}<br></br></button>
        ))}
      </li>
    </div>
    </div>
  );
}

export default Hub;