import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Hub() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: ""
  });

  const [name, setName] = useState("Unchanged");
  const [description, setDescription] = useState("Unchanged");
  const [owner, setOwner] = useState("Unchanged");
  const [hids, setHids] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    fetchData();
  }, []); // Empty dependency array to fetch data only once when component mounts

  // Function to fetch data from the database
  const fetchData = async () => {
    try {
      // Make an HTTP request to fetch data
      const url = await fetch('http://localhost:8000/hubs');
      if (!response.ok) {
        throw new Error('Server not up silly goose');
      }
      axios.post(url, uid).then((response) => {
        console.log("RESPONSE ONE")
        console.log(response.uids);
        setHids(response.uids);
    });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Hubs</h1>
      <form>
        <label for="fname">Join new hub: </label>
        <input type="text" id="code" name="code" placeholder="Enter access code"></input><br></br>
      </form>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Hub;