import React, { useState, useEffect } from "react";
import axios from 'axios';

function Hub() {

  const hub = useState({
    name: "",
    description: "",
    owner: ""
  });

  const hubs = [];

  const [isLoading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    uid: "03"
  });

  useEffect(() => {
    let ignore = false;
    if(!ignore) {
      const url = 'http://localhost:8000/hubs';

      axios.post(url, JSON.stringify(formData)).then((response) => {
        console.log(response.data);
        for(let i = 0; i < response.data.length; i++) {
          hub.name = response.data[i].name;
          hub.description = response.data[i].description;
          hub.owner = response.data[i].owner;
          hubs.push(hub);
        }
        setLoading(false);
      });
    }
    return () => { ignore = true }
  }, []);

  if(isLoading) {
    return <div className="App">Loading...</div>
  }


  return (
    <div>
      <h1>Hubs</h1>
      <form>
        <label htmlFor="fname">Join new hub: </label>
        <input type="text" id="code" name="code" placeholder="Enter access code"></input><br></br>
      </form>
      <div>
        {hubs.map(function(hub) {
          return (
            <div key={hub.name}>
              <p>Hub Name: {hub.name}</p>
              <p>Hub description: {hub.description}</p>
              <p>Hub owner: {hub.owner}</p>
              <br></br>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Hub;