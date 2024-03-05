import React, { useState, useEffect } from "react";
import axios from 'axios';

function Hub_Individual() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');

    const [formData, setFormData] = useState({
        hid: "01"
      });

    async function getHubInfo() {
        console.log(formData);
        const url = 'http://localhost:8000/hub-individual';
        axios.post(url, JSON.stringify(formData)).then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
          setOwner(response.data.owner);
        });
    }

    useEffect(() => {
        getHubInfo().then();
    }, []);

    return (
        <div>
          <h1>{name}</h1><br></br>
          <h2>{owner}</h2><br></br>
          <h2>{description}</h2>
        </div>
    );
}