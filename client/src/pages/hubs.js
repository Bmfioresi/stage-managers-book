import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';

function Hub() {

  let navigate = useNavigate();
  const [hubs, setHubs] = useState([]);

  const [formData, setFormData] = useState({
    uid: "03"
  });

  const [redirect, setRedirect] = useState("FALSE");

  async function getHubs() {
    console.log(formData);
    const url = 'http://localhost:8000/hubs';
    axios.post(url, JSON.stringify(formData)).then((response) => {
      const hubTemp = [];
      console.log(response.data);
      for(let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].name);
        hubTemp.push({name: response.data[i].name, description: response.data[i].description, owner: response.data[i].owner});
      }
      setHubs(hubTemp);
    });
  }

  async function routeChange(hid) { 
    console.log(hid);
    let path = `/hubs/${hid}`; 
    navigate(path);
    console.log("wtf lmfao");
  }

  useEffect(() => {
    getHubs().then();
  }, []);

  async function dummyFunc() {
    console.log("ebic");
    setRedirect("TRUE")
  }

  if(redirect == "TRUE") {
    return <Navigate to='/hubs/hid' />;
  }

  return (
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
  );
}

export default Hub;