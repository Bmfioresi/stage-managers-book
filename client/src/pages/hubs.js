import React, { useState, useEffect } from "react";
import axios from 'axios';

function Hub() {

  const [name, setName] = useState("Unchanged name");
  const [description, setDescription] = useState("Unchanged description");
  const [owner, setOwner] = useState("Unchanged owner");
  const [hubs, setHubs] = useState([]);

  const [formData, setFormData] = useState({
    uid: "03"
  });

  async function getHubs() {
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

  useEffect(() => {
    getHubs().then();
  }, []);

  return (
    <div>
      <h1>Hubs</h1>
      <form>
        <label htmlFor="fname">Join new hub: </label>
        <input type="text" id="code" name="code" placeholder="Enter access code"></input><br></br>
      </form>
      <h2>Hub list:</h2>
      <div>
        {hubs.map(hub => <button>{hub.name}<br></br>{hub.owner}<br></br>{hub.description}<br></br><br></br></button>)}
      </div>
    </div>
  );
}

export default Hub;